import { Module } from "@nestjs/common";
import { CampaignController } from "./campaign.controller";
import { CampaignService } from "./campaign.service";
import { CampaignMapper } from "./campaign.mapper";

@Module({
    imports: [],
    controllers: [CampaignController],
    providers: [CampaignService, CampaignMapper]   
})
export class CampaignModule {}