const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4200;
const UserRoutes = require("../Routes/User");
const ArticleRoutes = require("../Routes/Article");
class Server {
  constructor() {
    this.app = express();
  }
  initiateServer = function () {
    try {
      const corsOptions = {
        methods: "GET,PUT,PATCH,POST,DELETE",
        credentials: true,
        preflightContinue: false,
        optionsSuccessStatus: 204,
      };

      this.app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "content-type");
        res.header(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
      });
      this.app.use(cors(corsOptions));
      this.app.use(express.json());
      this.app.use(express.urlencoded());

      this.app.use((req, res, next) => {
        console.log(req.method, req.url);
        next();
      });
      this.app.get("/", (req, res) => {
        res.send("Hello from Express!");
      });

      this.app.use("/api/v1", UserRoutes);
      this.app.use("/api/v1/article", ArticleRoutes);

      this.app.listen(port, () => {
        console.log(`Express server is running on port ${port}`);
      });
    } catch (error) {
      console.log("Initiate server error: ", error);
    }
  };
  getServer = function () {
    return this.app;
  };
}
module.exports = new Server();
