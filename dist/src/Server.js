"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
require("express-async-errors");
const routes_1 = __importDefault(require("./routes"));
const jet_logger_1 = __importDefault(require("jet-logger"));
const apollo_server_express_1 = require("apollo-server-express");
const app = (0, express_1.default)();
const { BAD_REQUEST } = http_status_codes_1.default;
/************************************************************************************
 *                              Set basic express settings                          *
 ***********************************************************************************/
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Security
if (process.env.NODE_ENV === "production") {
    app.use((0, helmet_1.default)());
}
// Add APIs
app.use("/api", routes_1.default);
// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err, req, res, next) => {
    jet_logger_1.default.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});
// create a user graphql schema
const typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
        hello: String
    }
`;
const resolvers = {
    Query: {
        hello() {
            return;
        },
    },
};
const apolloServer = new apollo_server_express_1.ApolloServer({
    resolvers,
    typeDefs,
});
apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app });
});
/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/
// const viewsDir = path.join(__dirname, "views");
// app.set("views", viewsDir);
// const staticDir = path.join(__dirname, "public");
// app.use(express.static(staticDir));
// app.get("*", (req: Request, res: Response) => {
//     res.sendFile("index.html", { root: viewsDir });
// });
// Export express instance
exports.default = app;
