import { InjectConnection } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Connection } from "mongoose";

@Injectable()
export class DataSyncService {
  constructor(@InjectConnection() private readonly mongoConnection: Connection) {}

  async handleDatabaseChange(change: DbChange) {
    if (change.operation === "create") {
      await this.handleInsert(change);
    } else if (change.operation === "update") {
      await this.handleUpdate(change);
    } else if (change.operation === "delete") {
      await this.handleDelete(change);
    }
  }

  private async handleInsert(change: DbChange) {
    try {
      const collection = this.mongoConnection.collection(change.collection);
      await collection.insertOne(change.document);
      console.log(`Inserted document into ${change.collection}`, change.document);
    } catch (error) {
      console.error(`Error inserting document into ${change.collection}`, error);
    }
  }

  private async handleUpdate(change: DbChange) {
    try {
      const collection = this.mongoConnection.collection(change.collection);
      const { _id, ...updateData } = change.document;
      if (!_id) {
        console.warn(`Update operation missing _id in ${change.collection}`);
        return;
      }
      await collection.updateOne({ _id }, { $set: updateData });
      console.log(`Updated document in ${change.collection}`, change.document);
    } catch (error) {
      console.error(`Error updating document in ${change.collection}`, error);
    }
  }

  private async handleDelete(change: DbChange) {
    try {
      const collection = this.mongoConnection.collection(change.collection);
      const { _id } = change.document;
      if (!_id) {
        console.warn(`Delete operation missing _id in ${change.collection}`);
        return;
      }
      await collection.deleteOne({ _id });
      console.log(`Deleted document from ${change.collection}`, change.document);
    } catch (error) {
      console.error(`Error deleting document from ${change.collection}`, error);
    }
  }
}
