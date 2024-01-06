import { encode, decode } from "../../src/helper";

describe("encoding and decoding jwt tokens", () => {
  const token = encode({ id: 1, email: "email@test.co" });
  it("should encode the payload in a jwt token", () => {
    expect(token).toBeDefined();
    expect(token).toMatch(/^[^.]+\.[^.]+\.[^.]+$/);
  });
  it("Should decode the token and return the payload", () => {
    const payload = decode(token);
    expect(payload).toBeDefined();
    expect(payload).toHaveProperty("id");
    expect(payload).toHaveProperty("email");
    expect(payload.email).toBe("email@test.co");
  });
});
