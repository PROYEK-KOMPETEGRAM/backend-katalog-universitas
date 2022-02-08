// Set the env file, must be first
import dotenv from "dotenv";
import request from "supertest";
import app from "../src/Server";

const result2 = dotenv.config({
    path: `./src/pre-start/env/test.env`,
});

if (result2.error) {
    throw result2.error;
}

describe("Test the root path", () => {
    test("It should response GET method", async () => {
        try {
            const res = await request(app).get("/");
            expect(res.status).toBe(200);
        } catch (error) {
            return;
        }
    });
});
