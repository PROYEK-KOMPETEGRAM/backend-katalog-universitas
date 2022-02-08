"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./pre-start"); // Must be the first import
const _server_1 = __importDefault(require("@server"));
const jet_logger_1 = __importDefault(require("jet-logger"));
// Start the server
const port = Number(process.env.PORT || 3000);
_server_1.default.listen(port, () => {
    jet_logger_1.default.info("Express server started on port: " + port);
});
