import { Module } from "@nestjs/common";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { ProductModule } from './../product/product.module';
import { CampaignModule } from "src/campaign/campaign.module";
import { DonationModule } from "src/donation/donation.module";
import { ProductService } from "src/product/product.service";
import { CampaignService } from "src/campaign/campaign.service";
import { DonationService } from "src/donation/donation.service";
import { ReportMapper } from "./report.mapper";

@Module({
    imports: [ProductModule, CampaignModule, DonationModule],
    controllers: [ReportController],
    providers: [ReportService, ProductService, CampaignService, DonationService, ReportMapper],
  })
  export class ReportModule {}