import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";

import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";

import BaseRouter from "./routes";
import logger from "jet-logger";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings                          *
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet());
}

// Add APIs
app.use("/api", BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

// create a user graphql schema

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello() {
            return "hello world";
        },
    },
};
const apolloServer = new ApolloServer({
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
export default app;
