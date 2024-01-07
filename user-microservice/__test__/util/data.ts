import { faker } from "@faker-js/faker";
import { UserType, OrganisationType } from "../../src/types";

export function createRandomUser(): UserType {
  return {
    firstname: faker.internet.userName(),
    lastname: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phoneNumber: faker.phone.number(),
    country: faker.location.country(),
  };
}

export const USERS: UserType[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});

export function createRandomOrganisation(id: number): OrganisationType {
  return {
    name: faker.string.alphanumeric(),
    description: faker.string.sample(),
    logo: faker.internet.avatar(),
    createdBy: id,
  };
}
