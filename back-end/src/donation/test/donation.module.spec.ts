import { Test, TestingModule } from '@nestjs/testing';
import { DonationModule } from '../donation.module';
import { DonationController } from '../donation.controller';
import { DonationService } from '../donation.service';
import { DonationMapper } from '../donation.mapper';
import { PrismaModule } from '../../prisma/prisma.module';

describe('DonationModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
      module = await Test.createTestingModule({
        imports: [DonationModule, PrismaModule], // Adicione o PrismaModule aqui
      }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should have DonationController', () => {
        const controller = module.get<DonationController>(DonationController);
        expect(controller).toBeDefined();
    });

    it('should have DonationService', () => {
        const service = module.get<DonationService>(DonationService);
        expect(service).toBeDefined();
    });

    it('should have DonationMapper', () => {
        const mapper = module.get<DonationMapper>(DonationMapper);
        expect(mapper).toBeDefined();
    });
});
