import { Module } from "@nestjs/common";
import { DonationController } from "./donation.controller";
import { DonationService } from "./donation.service";
import { DonationMapper } from "./donation.mapper";

@Module({
    imports: [],
    controllers: [DonationController],
    providers: [DonationService, DonationMapper],
  })
  export class DonationModule {}