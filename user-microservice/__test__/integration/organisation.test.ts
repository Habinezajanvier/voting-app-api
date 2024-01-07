import request from "supertest";
import app from "../../src/app";
import prisma from "../../src/db/prisma";
import { OrganisationType, UserType } from "../../src/types";
import { encode } from "../../src/helper";
import { faker } from "@faker-js/faker";
import { Organisation, User } from "@prisma/client";
import { createRandomOrganisation, createRandomUser } from "../util/data";

describe("Organisation", () => {
  let token: string;
  let user: User;
  let organisation: Organisation;
  beforeAll(async () => {
    const testAccount: UserType = {
      firstname: "testname1",
      lastname: "testlast",
      email: "test8@email.com",
      phoneNumber: "+250790000000",
      country: "Rwanda",
      password: "hashedPassword",
    };

    user = await prisma.user.create({ data: testAccount });
    token = encode({ id: user.id, email: user.email });

    const organisations = await prisma.organisation.createMany({
      data: faker.helpers.multiple(() => createRandomOrganisation(user.id), {
        count: 3,
      }),
      skipDuplicates: true,
    });
  });
  afterAll(async () => {
    const deleteOrg = prisma.organisation.deleteMany();
    await prisma.$transaction([deleteOrg]);
    await prisma.$disconnect();
  });

  it("Should create new organisation", async () => {
    const res = await request(app)
      .post("/api/organisations/")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...createRandomOrganisation(0), createdBy: undefined });
    organisation = res.body.data;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
  });
  it("Should return error if no data submitted", async () => {
    const res = await request(app)
      .post("/api/organisations/")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
  it("Should return 404 if organisation is not found", async () => {
    const res = await request(app)
      .put(`/api/organisations/${0}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("Should update organisation if id is given", async () => {
    const res = await request(app)
      .put(`/api/organisations/${organisation.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Update-name" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.name).toEqual("Update-name");
  });
  it("Should get array of created Organisations", async () => {
    const res = await request(app)
      .get("/api/organisations/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBeGreaterThan(3);
  });
  it("Should get one organisation if Id is provided", async () => {
    const res = await request(app)
      .get(`/api/organisations/${organisation.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toEqual(organisation.id);
  });

  it("Should get orgs created by me", async () => {
    const res = await request(app)
      .get(`/api/organisations/me`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBeGreaterThan(3);
  });

  it("Should assign user to organisation", async () => {
    const newUser = await prisma.user.create({ data: createRandomUser() });
    const res = await request(app)
      .post(`/api/organisations/${organisation.id}/assign`)
      .set("Authorization", `Bearer ${token}`)
      .send({ userId: newUser.id });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
  });
  it("Should delete organisation if id is provided", async () => {
    const res = await request(app)
      .delete(`/api/organisations/${organisation.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.id).toEqual(organisation.id);
  });
  it("Should return 404 if record is no longer available", async () => {
    const res = await request(app)
      .get(`/api/organisations/${organisation.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
