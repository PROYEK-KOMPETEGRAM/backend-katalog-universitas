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

const mockUsers = {
    users: [
        {
            name: "Sean Maxwell",
            email: "sean.maxwell@gmail.com",
            id: 159123164363,
        },
        {
            name: "Gordan Freeman",
            email: "gordan.freeman@halflife.com",
            id: 906524522143,
        },
        { name: "John Smith", email: "jsmith@yahoo.com", id: 357437875835 },
    ],
};

describe("Test user API", () => {
    let res;
    beforeAll(async () => {
        res = await request(app).get("/api/users/all");
    });

    test("Test user response status code to be 200", () => {
        // const res = await request(app).get("/api/users/all");
        expect(res.statusCode).toBe(200);
    });

    test("Test user response to be defined", () => {
        // const res = await request(app).get("/api/users/all");
        expect(res.body).toBeDefined();
    });

    test("User must equal to mock user", () => {
        expect(res.body).toEqual(mockUsers);
    });

    test(" 1+ 1 is greater than 2", () => {
        const summary = 1 + 1;
        expect(summary).toBeGreaterThan(1);
    });
});
