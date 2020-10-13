const assert = require("assert");
const proxyquire = require("proxyquire");

const { productsMock, ProductsServiceMock } = require("../src/utils/mocks");

const testServer = require("../src/utils/test/testServer");

describe("routes - api - products", () => {
  const route = proxyquire("../src/routes/index", {
    "../services": ProductsServiceMock,
  });

  const request = testServer(route);

  describe("GET /products", () => {
    it("should respond with status 200", (done) => {
      request.get("/api/products").expect(200, done);
    });

    it("should respond with the list of products", (done) => {
      request.get("/api/products").end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: productsMock,
          message: "products listed",
        });

        done();
      });
    });
  });
});
