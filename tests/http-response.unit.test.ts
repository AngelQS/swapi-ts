// const { createResponse } =  require("../src/utils/response.util");
import { createResponse } from "../src/utils/response.util";

test("CreateResponse is an object", () => {
  expect(typeof createResponse).toBe("function");
});

test("http status 200", () => {
    const response = createResponse(200, null);
    expect(response.statusCode).toBe(200);
    expect(typeof response.body).toBe("string");
    expect(response.headers["Content-Type"]).toBe("application/json");
})