declare type BaseModel = {
  _id: string;
};

declare type InfiniteResponse<T> = {
  nextCursor?: number;
  data: Array<T>;
};

declare type ErrorResponse = {
  message: string | string[];
  error?: string;
  statusCode?: number;
};
