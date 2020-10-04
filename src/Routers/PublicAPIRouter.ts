import { PromiseRouter } from './PromiseRouter';
import express from 'express';
export class PublicAPIRouter extends PromiseRouter {
    mountRoutes() {
        this.route(
            "GET",
            "/hello",
            (req, res) => res.json({message: "Hello World! this is from public api"})
        );
    }
    expressRouter() {
        const router = express.Router();
        router.use("/", super.expressRouter());
        return router;
    }
}