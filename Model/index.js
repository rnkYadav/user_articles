const { models } = require("./constant");

const getModelFromName = async (modelName) => {
    try {
        let model = models[modelName];
        if (!model) throw Error(`Model not found for name : ${modelName}`);
        return model;
    } catch (error) {
        throw Error(error.message);
    }
};

const getCount = async (modelName, condition) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let count = await MODEL.countDocuments(condition).lean();
        return count;
    } catch (error) {
        throw Error(error);
    }
};

const getByQuery = async (modelName, query) => {
    try {
        let MODEL = await getModelFromName(modelName);
        return await MODEL.aggregate(query);
    } catch (error) {
        throw Error(error);
    }
};

const getQueryCursor = async (modelName, query) => {
    try {
        let MODEL = await getModelFromName(modelName);
        return MODEL.aggregate(query).cursor().exec();
    } catch (error) {
        throw Error(error);
    }
};

const getData = async (modelName, condition, fields, skip, limit, populates = []) => {
    try {
        skip = skip ? parseInt(skip) : 0;
        limit = limit ? parseInt(limit) : 10000;
        let MODEL = await getModelFromName(modelName);
        let data = await MODEL.find(condition, fields)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate(populates)
            .lean();
        return data;
    } catch (error) {
        throw Error(error);
    }
};

const getSingleData = async (modelName, condition, fields, populates = [], sort) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let data = sort
            ? await MODEL.find(condition, fields).populate(populates).sort(sort).limit(1).lean()
            : await MODEL.findOne(condition, fields).populate(populates).lean();
        return sort && data?.length ? data[0] : data;
    } catch (error) {
        throw Error(error);
    }
};

const getDistinct = async (modelName, key, condition) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let data = await MODEL.distinct(key, condition).lean();
        return data;
    } catch (error) {
        throw Error(error);
    }
};

const getById = async (modelName, _id, fields, populates = []) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let data = await MODEL.findOne({ _id: new ObjectId(_id) }, fields)
            .populate(populates)
            .lean();
        return data;
    } catch (error) {
        throw Error(error);
    }
};

const saveData = async (modelName, data) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let modelInstance = new MODEL(data);
        let savedData = await modelInstance.save();
        return savedData;
    } catch (error) {
        throw Error(error.message);
    }
};

const updateById = async (modelName, _id, data) => {
    try {
        let MODEL = await getModelFromName(modelName);
        Object.assign(data, { modifiedAt: new Date() });
        let updatedData = await MODEL.findOneAndUpdate(
            { _id: new ObjectId(_id) },
            {
                $set: data,
            },
            { new: true }
        ).lean();
        return updatedData;
    } catch (error) {
        throw Error(error.message);
    }
};

const deleteById = async (modelName, _id) => {
    try {
        let MODEL = await getModelFromName(modelName);
        let document = await MODEL.findOne({ isActive: true, _id: new ObjectId(_id) }, { _id: 1 });
        if (!document) throw Error(`No entry found for _id : ${_id}`);
        await MODEL.findOneAndUpdate(
            { _id: new ObjectId(_id) },
            {
                $set: { isActive: false, modifiedAt: new Date() },
            }
        ).lean();
        return true;
    } catch (error) {
        throw Error(error.message);
    }
};

module.exports = {
    getModelFromName,
    getCount,
    getByQuery,
    getData,
    getSingleData,
    getDistinct,
    getById,
    saveData,
    updateById,
    deleteById,
    getQueryCursor,
};
