import express, {Request, Response} from 'express';

export class FileRouter {
    expressRouter(maxFileUpload: string) {
        const router = express.Router();
        router.use("/file/:appId/:filename", this.getHandler);
        return router;
    }
    getHandler(req: Request, res: Response) {
        res.send("file");
    }
}