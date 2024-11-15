declare type Pagination = {
  page: number;
  limit: number;
};

declare type SessionUser = {
  _id: string;
  name: string;
  email: string;
};

declare type ChangeOperation = "create" | "update" | "delete";

declare type DbChange<Document extends import("../models").BaseDocument = any> = {
  operation: ChangeOperation;
  document: Document;
  collection: string;
};
