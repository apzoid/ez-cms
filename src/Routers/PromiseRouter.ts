import { Request, Response, Router } from "express";
type handlerType = (req: Request, res: Response) => {};
// base class for routes
export abstract class PromiseRouter {
  routes: { path: string; method: string; handler: handlerType }[];
  constructor(routes = []) {
    this.routes = routes;
    this.mountRoutes();
  }
  mountRoutes() {}
  route(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    ...handlers: handlerType[]
  ) {
    let handler =
      handlers.length > 1
        ? function (req: Request, res: Response) {
            return handlers.reduce((promise: any, handler) => {
              return promise.then(() => {
                return handler(req, res);
              });
            }, Promise.resolve());
          }
        : handlers[0];
    this.routes.push({
      method,
      path,
      handler,
    });
  }
  // mount route on this router to express app
  mountOnTo(expressRouter: any) {
    this.routes.forEach((route) => {
      const method = route.method.toLowerCase();
      const handler = route.handler; // use higher order function and handle other things
      expressRouter[method].call(expressRouter, route.path, route.handler);
    });
    return expressRouter;
  }
  expressRouter() {
      return this.mountOnTo(Router());
  }
}
