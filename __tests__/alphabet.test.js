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

afterAll(() => db.end());
