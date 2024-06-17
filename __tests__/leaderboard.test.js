import seed from "../db/seed.js";
import app from "../app.js";
import db from "../db/index.js";
import request from "supertest";

beforeEach(() => {
  return seed();
});

describe("GET /api/leaderboard", () => {
  it("Responds with array containing all users on the leaderboard", () => {
    return request(app)
      .get("/api/leaderboard")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.users).toBeInstanceOf(Array);
        res.body.users.forEach((user) => {
          expect(user).toMatchObject({
            leaderboard_id: expect.any(Number),
            score: expect.any(Number),
            user_id: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/leaderboard/:user_id", () => {
  it("Responds with object containing user with that user id on the leaderboard", () => {
    return request(app)
      .get("/api/leaderboard/1")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.user).toMatchObject({
          leaderboard_id: 1,
          score: 100,
          user_id: 1,
          created_at: expect.any(String),
        });
      });
  });
});

describe("POST /api/leaderboard", () => {
  it("Returns a status code of 201 and the new comment in the body", () => {
    const newUser = {
      user_id: 1,
      score: 150,
    };
    return request(app)
      .post("/api/leaderboard")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.user).toMatchObject({
          score: 150,
          user_id: 1,
        });
      });
  });
});

afterAll(() => db.end());
