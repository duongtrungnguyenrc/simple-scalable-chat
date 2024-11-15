declare namespace Express {
  declare type User = {
    _id: string;
    name: string;
    email: string;
    [string]: any;
  };
}
