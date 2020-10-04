import { AppConfig } from "interfaces";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import { FileRouter } from "../Routers/FileRouter";
import { PublicAPIRouter } from "../Routers/PublicAPIRouter";

/**
 * EzCMS
 * - create server and configure database and other app level things
 */
export class EzCMS {
  constructor(private appConfig: AppConfig) {}
  static app(maxUploadSize = "20mb") {
    const app = express();
    app.use("/", new FileRouter().expressRouter(maxUploadSize));
    app.use("/health", (req, res) => res.json({ status: "ok" }));
    app.use(
      "/",
      bodyParser.urlencoded({ extended: false }),
      new PublicAPIRouter().expressRouter()
    );
    app.use(cors());
    app.use(bodyParser());
    app.use(helmet());
    app.listen(3000, () => console.log("Server starts listening..."));
  }
}
