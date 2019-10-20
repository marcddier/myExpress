"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const myExpress_1 = __importDefault(require("./myExpress"));
const app = new myExpress_1.default();
app.get('/coucou', (req, res) => {
    res.write('coucou');
    res.end();
});
