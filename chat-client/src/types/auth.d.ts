declare type User = BaseModel & {
  email: string;
  name: string;
};

declare type SignInDto = {
  email: string;
  password: string;
};

declare type SignUpDto = {
  email: string;
  name: string;
  password: string;
};
