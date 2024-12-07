import { Test, TestingModule } from '@nestjs/testing';
import { CampaignModule } from '../campaign.module';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';
import { CampaignMapper } from '../campaign.mapper';
import { PrismaModule } from '../../prisma/prisma.module';

describe('CampaignModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [CampaignModule, PrismaModule], // Adicione o PrismaModule aqui
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should have CampaignController', () => {
        const controller = module.get<CampaignController>(CampaignController);
        expect(controller).toBeDefined();
    });

    it('should have CampaignService', () => {
        const service = module.get<CampaignService>(CampaignService);
        expect(service).toBeDefined();
    });

    it('should have CampaignMapper', () => {
        const mapper = module.get<CampaignMapper>(CampaignMapper);
        expect(mapper).toBeDefined();
    });
});
