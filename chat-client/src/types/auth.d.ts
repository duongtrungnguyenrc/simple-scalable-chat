declare type User = BaseModel & {
  email: string;
  name: string;
};

declare type SignInDto = {
  email: string;
  password: string;
};
