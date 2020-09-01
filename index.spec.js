// test("a placeholder test", async () => {
//   expect(2 + 2).toBe(4);
// });

const supertest = require("supertest");
//remember our server wount actually start
// due to the if statement in index.js
const server = require("./index");
const db = require("./data/dbConfig");

beforeEach(async () => {
  await db.seed.run;
});

test("welcome route", async () => {
  const res = await supertest(server).get("/");
  //  Does it return the expected status code?
  expect(res.status).toBe(200);
  //   //  Does it return the expected data format?
  expect(res.type).toBe("application/json");
  //  Does it return the expected data?
  //   console.log(res.body);
  expect(res.body.api).toBe("up");
});

test("create hobbit route", async () => {
  const res = await supertest(server)
    .post("/hobbits")
    .send({ name: "gaffer" });
  expect(res.status).toBe(201);
  expect(res.type).toBe("application/json");
  expect(res.body.name).toBe("gaffer");
  //deep assertion
  expect(res.body).toEqual({ id: 5, name: "gaffer" });
});

test("get hobbit list", async () => {
  const res = await supertest(server).get("/hobbits");
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].id).toBe(1);
  expect(res.body[0].name).toBe("sam");
});
