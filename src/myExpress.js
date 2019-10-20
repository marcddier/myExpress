"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
class myExpress {
    constructor() {
        this.httpServer = null;
        this.routes = [];
    }
    listen(port) {
        this.httpServer = http_1.default.createServer((req, res) => {
            const { method, url } = req;
            const requestedRoute = this.routes.find((route) => {
                if (route.method === method && route.path === url) {
                    return route;
                }
                return undefined;
            });
            if (requestedRoute) {
                requestedRoute.callback(req, res);
            }
            else {
                res.write(404);
                res.end();
            }
        }).listen(port);
    }
    get(path, callback) {
        this.routes.push({ method: 'GET', path, callback });
    }
}
exports.default = myExpress;
