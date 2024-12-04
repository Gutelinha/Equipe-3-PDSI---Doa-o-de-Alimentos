import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { ReportMapper } from "./report.mapper";

@Module({
    imports: [],
    controllers: [ReportController],
    providers: [ReportService, ReportMapper],
  })
  export class ReportModule {}