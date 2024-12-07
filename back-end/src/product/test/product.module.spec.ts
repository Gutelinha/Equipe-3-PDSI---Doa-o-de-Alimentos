import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from '../product.module';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductMapper } from '../product.mapper';
import { PrismaModule } from '../../prisma/prisma.module';

describe('ProductModule', () => {
    let module: TestingModule;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [ProductModule, PrismaModule], // Adicione o PrismaModule aqui
        }).compile();
    });

    it('should be defined', () => {
        expect(module).toBeDefined();
    });

    it('should have ProductController', () => {
        const controller = module.get<ProductController>(ProductController);
        expect(controller).toBeDefined();
    });

    it('should have ProductService', () => {
        const service = module.get<ProductService>(ProductService);
        expect(service).toBeDefined();
    });

    it('should have ProductMapper', () => {
        const mapper = module.get<ProductMapper>(ProductMapper);
        expect(mapper).toBeDefined();
    });
});
