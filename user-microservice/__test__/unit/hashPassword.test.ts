import { hashPassword, comparePassword } from "../../src/helper";

describe("Hashing and comparing the password", () => {
  let hash: string;
  it("should hash the password", async () => {
    hash = await hashPassword("password");
    expect(hash).toBeDefined();
  });
  it("Should return true if the passwordd is the same", async () => {
    const compareHash = await comparePassword("password", hash);
    expect(compareHash).toBeTruthy();
  });
  it("Should return false if the passwordd is the same", async () => {
    const compareHash = await comparePassword("Password123", hash);
    console.log({ compareHash });
    expect(compareHash).toBeFalsy();
  });
});
