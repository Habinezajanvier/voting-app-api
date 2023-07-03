export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  country?: string;
  phoneNumber: string;
};

export type UserInput = Pick<User, "email" | "phoneNumber">;
