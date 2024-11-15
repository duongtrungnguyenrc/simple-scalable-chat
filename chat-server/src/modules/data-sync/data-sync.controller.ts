import { EventPattern, Payload } from "@nestjs/microservices";
import { Controller } from "@nestjs/common";

import { DataSyncService } from "./data-sync.service";

@Controller()
export class DataSyncController {
  constructor(private readonly dataSyncService: DataSyncService) {}

  @EventPattern("db.changes")
  onChange(@Payload() payload: DbChange) {
    return this.dataSyncService.handleDatabaseChange(payload);
  }
}
