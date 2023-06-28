export type User = {
  name: string;
  email: string;
};

export type UserInput = Pick<User, "email" | "name">;
