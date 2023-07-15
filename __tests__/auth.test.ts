import request from "supertest";
import prisma from "../src/db/prisma";
import app from "../src/app";
import { Status } from "../src/types";

describe("Sigup", () => {
  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    await prisma.$transaction([deleteUsers]);
    await prisma.$disconnect();
  });
  const query = `mutation($signupInput: SignupData!){
    createUser(input: $signupInput){
      ... on Error{
        status
        error
      }
      
      ... on AuthData{
        message
        status
        token
        data {
          id
          email
        }
      }
    }
  }`;
  const variables = {
    signupInput: {
      email: "habinezajanvier688900@gmail.com",
      password: "Janvier@@@123",
      firstname: "habineza",
      lastname: "Janvier",
      phoneNumber: "+250789121324",
      country: "Rwanda",
    },
  };
  it("Should return response if user created successfully", async () => {
    const res = await request(app).post("/graphql").send({ query, variables });
    const incomingResponse = res.body.data.createUser;
    expect(res.status).toBe(200);
    expect(incomingResponse.status).toBe(Status.SUCCESS);
    expect(incomingResponse.data.email).toBe(variables.signupInput.email);
  });
  it("Should return an error if user is registered", async () => {
    const res = await request(app).post("/graphql").send({ query, variables });
    const incomingResponse = res.body.data.createUser;
    expect(res.status).toBe(200);
    expect(incomingResponse.status).toBe(Status.EMAIL_CONFLICT);
  });

  // Login tests
  const loginQuery = `
    mutation ($loginInput: LoginData!){
      userLogin(input: $loginInput){
        
       ... on Error {
        status
        error
        }
        
        ... on AuthData {
          message
          status
          token
          data {
            id
            email
          }
        }
      }
    }
    `;
  it("Should successfully log in a new user", async () => {
    const loginVar = {
      loginInput: {
        email: "habinezajanvier688900@gmail.com",
        password: "Janvier@@@123",
      },
    };
    const res = await request(app)
      .post("/graphql")
      .send({ query: loginQuery, variables: loginVar });
    const incomingResponse = res.body.data.userLogin;
    expect(res.status).toBe(200);
    expect(incomingResponse.status).toBe(Status.SUCCESS);
    expect(incomingResponse.data.email).toBe(variables.signupInput.email);
  });
  it("Should Throw an error if email is not registered", async () => {
    const loginVar = {
      loginInput: {
        email: "habinezajanvier688900@@gmail.com",
        password: "Janvier@@@123",
      },
    };
    const res = await request(app)
      .post("/graphql")
      .send({ query: loginQuery, variables: loginVar });
    const incomingResponse = res.body.data.userLogin;
    expect(res.status).toBe(200);
    expect(incomingResponse.status).toBe(Status.PASSWORD_CONFLICT);
    expect(incomingResponse).toHaveProperty("error");
  });
  it("Should Throw an error if  password is wrong", async () => {
    const loginVar = {
      loginInput: {
        email: "habinezajanvier688900@gmail.com",
        password: "Wrong@@@123",
      },
    };
    const res = await request(app)
      .post("/graphql")
      .send({ query: loginQuery, variables: loginVar });
    const incomingResponse = res.body.data.userLogin;
    expect(res.status).toBe(200);
    expect(incomingResponse.status).toBe(Status.PASSWORD_CONFLICT);
    expect(incomingResponse).toHaveProperty("error");
  });
});
