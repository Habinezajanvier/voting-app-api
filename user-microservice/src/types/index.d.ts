export type UserType = {
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  password: string;
  country: string;
};

export type OrganisationType = {
  logo?: string;
  name: string;
  description: string;
  createdBy: number;
};
