const db = require("../data/dbConfig");
const hobbitsModel = require("./hobbitsModel");

beforeEach(async () => {
  //re seed the database each time tests are run
  await db.seed.run();
});
describe("hobbits model", () => {
  test("getAll", async () => {
    const all = await hobbitsModel.getAll();
    expect(all).toHaveLength(4);
  });

  test("findById", async () => {
    const res = await hobbitsModel.findById(1);
    expect(res.name).toBe("sam");
  });

  test("insert", async () => {
    await hobbitsModel.insert({ name: "bilbo" });
    const hobbits = await db("hobbits").select();
    expect(hobbits).toHaveLength(5);
  });

  test("update", async () => {
    await hobbitsModel.update(1, { name: "tom" });
    const res = await hobbitsModel.findById(1);
    expect(res.name).toBe("tom");
  });

  test("delete", async () => {
    const res = await hobbitsModel.remove(1);
    expect(res).toBe(1);
    const hobbits = await hobbitsModel.getAll();
    expect(hobbits).toHaveLength(3);
    expect(hobbits.length).toBeGreaterThan(0);
  });
});
