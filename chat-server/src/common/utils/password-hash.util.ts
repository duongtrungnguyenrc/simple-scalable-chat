import { genSalt, hash } from "bcrypt";

import { HASHED_ROUNDS } from "../constants";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(HASHED_ROUNDS);
  return hash(password, salt);
};
