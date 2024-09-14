import seed from "../db/seed";
import request from "supertest";
import app from "../app.js";
import db from "../db/index.js";

beforeEach(() => {
  return seed();
});

describe("GET /api/users", () => {
  it("responds with array containing all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        expect(res.body.users.length).toBe(2);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            user_id: expect.any(Number),
            name: expect.any(String),
            email_address: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/users/:id", () => {
  it("responds with object of a user", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.user).toMatchObject({
          user_id: 1,
          name: "James Reed",
          email_address: "reedandj1@gmail.com",
        });
      });
  });
});

afterAll(() => db.end());
