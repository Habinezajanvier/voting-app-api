export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
};

export type UserInput = Pick<
  User,
  "email" | "phoneNumber" | "country" | "firstname" | "lastname" | "password"
>;

export enum Status {
  SUCCESS = "SUCCESS",
  PASSWORD_CONFLICT = "EMAIL_PASSWORD_CONFLICT",
  EMAIL_CONFLICT = "EMAIL_EXIST",
  SERVER_ERROR = "INTERNAL_SERVER_ERROR",
}

export enum Typename {
  RESPONSE = "Response",
  AUTH = "AuthData",
  ERROR = "Error",
}

export type Response = {
  message: string;
  status: Status;
  __typename: Typename;
};

export interface AuthData extends Response {
  data: User;
  token: string;
}

export type Error = {
  __typename: Typename.ERROR;
  error: string;
  status: Status;
};
