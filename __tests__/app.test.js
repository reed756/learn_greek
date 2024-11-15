import seed from "../db/seed.js";
import app from "../app.js";
import db from "../db/index.js";
import request from "supertest";

beforeEach(() => {
  return seed();
});

afterAll(() => db.end());

// ALPHABET ENDPOINTS
describe("GET /api/alphabet", () => {
  it("responds with array containing all objects of greek alphabet", () => {
    return request(app)
      .get("/api/alphabet")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.characters).toBeInstanceOf(Array);
        expect(res.body.characters.length).toBe(24);
        res.body.characters.forEach((character) => {
          expect(character).toMatchObject({
            alphabet_id: expect.any(Number),
            greek_letter: expect.any(String),
            phonetic_equivalent: expect.any(String),
            pronounced_as: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/alphabet/:id", () => {
  it("responds with object with a character from the greek alphabet", () => {
    return request(app)
      .get("/api/alphabet/1")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.character).toMatchObject({
          alphabet_id: 1,
          greek_letter: "Α α - Alpha",
          phonetic_equivalent: "a",
          pronounced_as: "a in father",
        });
      });
  });
});

// LEADERBOARD ENDPOINTS
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

describe("GET /api/leaderboard/notAnID", () => {
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/leaderboard/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});

// USERS ENDPOINTS
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

describe("GET /api/users/notAnID", () => {
  test("status:400, responds with an error message when passed a bad user ID", () => {
    return request(app)
      .get("/api/users/notAnID")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid input");
      });
  });
});
