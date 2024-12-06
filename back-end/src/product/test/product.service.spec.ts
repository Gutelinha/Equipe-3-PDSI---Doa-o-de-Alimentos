import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductCreateInputDto, ProductUpdateInputDto } from '../dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
    let service: ProductService;
    let prisma: PrismaService;

    const mockPrismaService = {
        produto: {
            create: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<ProductService>(ProductService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testes unitários para a criação de produtos
    describe('create', () => {
        it('should create a product successfully', async () => {
            const mockInput: ProductCreateInputDto = {
                barcode: '123456',
                name: 'Test Product',
                brand: 'Test Brand',
                type: 'Test Type',
                volume_unit: 'L',
            };
      
            const mockProduct = {
                codigo_barras: '123456',
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
      
            mockPrismaService.produto.create.mockResolvedValue(mockProduct);
      
            const result = await service.create(mockInput);
      
            expect(prisma.produto.create).toHaveBeenCalledWith({
                data: {
                    codigo_barras: mockInput.barcode,
                    nome: mockInput.name,
                    marca: mockInput.brand,
                    tipo: mockInput.type,
                    unidade_volume: mockInput.volume_unit,
                },
            });

            expect(result).toEqual(mockProduct);
        });
    });

    // Testes unitários para a busca de produtos pelo código de barras
    describe('findByBarcode', () => {
        it('should return the product if found', async () => {
            const mockBarcode = '123456';
            const mockProduct = {
                codigo_barras: mockBarcode,
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
      
            mockPrismaService.produto.findUnique.mockResolvedValue(mockProduct);
      
            const result = await service.findByBarcode(mockBarcode);
      
            expect(prisma.produto.findUnique).toHaveBeenCalledWith({
                where: { codigo_barras: mockBarcode },
            });
            
            expect(result).toEqual(mockProduct);
        });
      
        it('should throw NotFoundException if product is not found', async () => {
            mockPrismaService.produto.findUnique.mockResolvedValue(null);
      
            await expect(service.findByBarcode('123456')).rejects.toThrow(
                NotFoundException,
            );
        });
    });
    
    // Testes unitários para a atualização de produtos pelo código de barras
    describe('updateByBarcode', () => {
        it('should update the product successfully', async () => {
            const mockBarcode = '123456';
            const mockInput: ProductUpdateInputDto = {
                name: 'Updated Product',
                brand: 'Updated Brand',
                type: 'Updated Type',
                volume_unit: 'L',
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };
      
            const mockProduct = {
                codigo_barras: mockBarcode,
                nome: 'Updated Product',
                marca: 'Updated Brand',
                tipo: 'Updated Type',
                unidade_volume: 'L',
            };
      
            mockPrismaService.produto.findUnique.mockResolvedValue(mockProduct); // Simula o produto existente
            mockPrismaService.produto.update.mockResolvedValue(mockProduct);
        
            const result = await service.updateByBarcode(mockBarcode, mockInput);
        
            expect(prisma.produto.update).toHaveBeenCalledWith({
                data: {
                    nome: mockInput.name,
                    marca: mockInput.brand,
                    tipo: mockInput.type,
                    unidade_volume: mockInput.volume_unit,
                },
                where: { codigo_barras: mockBarcode },
            });

            expect(result).toEqual(mockProduct);
        });
      
        it('should throw BadRequestException if input is empty', async () => {
            const mockBarcode = '123456';
            const mockInput: ProductUpdateInputDto = {
                name: null,
                brand: null,
                type: null,
                volume_unit: null,
                isEmpty: jest.fn(() => true), // Simula o método isEmpty retornando true
            };
      
            await expect(service.updateByBarcode(mockBarcode, mockInput)).rejects.toThrow(
                BadRequestException,
            );
        });
    });
    
    // Testes unitários para a remoção de produtos pelo código de barras
    describe('deleteByBarcode', () => {
        it('should delete the product successfully', async () => {
            const mockBarcode = '123456';
            const mockProduct = {
                codigo_barras: mockBarcode,
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
      
            mockPrismaService.produto.delete.mockResolvedValue(mockProduct);
        
            const result = await service.deleteByBarcode(mockBarcode);
        
            expect(prisma.produto.delete).toHaveBeenCalledWith({
                where: { codigo_barras: mockBarcode },
            });

            expect(result).toEqual(mockProduct);
        });
    });

});

  