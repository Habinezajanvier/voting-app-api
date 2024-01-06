import request from "supertest";
import app from "../../src/app";
import { PollType } from "../../src/types";
import prisma from "../../src/db/prisma";
import { Poll } from "@prisma/client";

describe("Login", () => {
  const testPoll: PollType = {
    name: "Testing Poll",
    description: "Poll created for testing",
    organisationId: 1,
  };
  let poll: Poll;
  // beforeAll(async () => {
  //   poll = await prisma.poll.create({ data: testPoll });
  // });
  afterAll(async () => {
    const deletePoll = prisma.poll.deleteMany();
    await prisma.$transaction([deletePoll]);
    await prisma.$disconnect();
  });

  it("Should retern 201 if poll created successfully", async () => {
    const res = await request(app).post("/api/poll").send(testPoll);
    poll = res.body.data;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data.name).toBe(testPoll.name);
  });

  it("Should edit a given poll when id is provided", async () => {
    const res = await request(app).put(`/api/poll/${poll.id}`).send({
      name: "Edited testing poll",
      description: "The poll created and tested",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
  it("Should get a single poll if id is provided", async () => {
    const res = await request(app).get(`/api/poll/${poll.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.data).toHaveProperty("name");
  });
  it("Should return reterun 404 if no poll found", async () => {
    const res = await request(app).get(`/api/poll/${8}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
  it("Should get an array of polls if exist", async () => {
    const res = await request(app).get("/api/poll");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data.length).toBeGreaterThan(0);
  });
  it("Should delete a poll if id is provided", async () => {
    const res = await request(app).delete(`/api/poll/${poll.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
  it("Should return 404 if no poll available", async () => {
    const res = await request(app).get("/api/poll");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
  });
});
