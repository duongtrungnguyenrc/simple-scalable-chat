import { HttpException, InternalServerErrorException } from "@nestjs/common";
import { ClientSession } from "mongoose";

export async function withMutateTransaction<T>(session: ClientSession, callback: (session: ClientSession) => Promise<T>): Promise<T> {
  session.startTransaction();

  try {
    const result = await callback(session);
    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();

    throw error instanceof HttpException ? error : new InternalServerErrorException(error.message);
  } finally {
    session.endSession();
  }
}
