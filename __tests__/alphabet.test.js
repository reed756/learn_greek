import seed from "../db/seed.js";
import app from "../app.js";
import db from "../db/index.js";
import request from "supertest";

beforeEach(() => {
  return seed();
});

describe("GET /api/alphabet", () => {
  it("responds with array containing all objects of greek alphabet", () => {
    return request(app)
      .get("/api/alphabet")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .then((res) => {
        expect(res.body.characters.length).toBe(24);
      });
  });
});

describe("GET /api/alphabet/:id", () => {
  it("responds with object with a character from the greek alphabet", () => {
    return request(app).get("/api/alphabet/1").expect(200).expect("Content-Type", "application/json; charset=utf-8");
  });
});

afterAll(() => db.end());
