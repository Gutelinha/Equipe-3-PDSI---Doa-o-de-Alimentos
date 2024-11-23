import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { CampaignModule } from './campaign/campaign.module';

@Module({
  imports: [
    PrismaModule,
    ProductModule,
    CampaignModule
  ]
})
export class AppModule {}
