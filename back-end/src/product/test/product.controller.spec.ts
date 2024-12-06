import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from '../product.controller';
import { ProductService } from '../product.service';
import { ProductMapper } from '../product.mapper';
import { ProductCreateInputDto, ProductUpdateInputDto, ProductOutputDto, ProductDeleteOutputDto } from '../dto';
import { BadRequestException } from '@nestjs/common';

describe('ProductController', () => {
    let controller: ProductController;
    let productService: ProductService;
    let productMapper: ProductMapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: {
                        create: jest.fn(),
                        findByBarcode: jest.fn(),
                        updateByBarcode: jest.fn(),
                        deleteByBarcode: jest.fn(),
                    },
                },
                {
                    provide: ProductMapper,
                    useValue: {
                        toOutput: jest.fn(),
                        toDeleteOutput: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
        productMapper = module.get<ProductMapper>(ProductMapper);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testes unitários para o endpoint de criação de produtos
    describe('saveProduct', () => {
        it('should create a product and return its output DTO', async () => {
            const mockCreateInput: ProductCreateInputDto = {
                barcode: '123456',
                name: 'Test Product',
                brand: 'Test Brand',
                type: 'Test Type',
                volume_unit: 'L',
            };
            const mockCreatedProduct = {
                codigo_barras: '123456',
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
            const mockOutputDto: ProductOutputDto = {
                barcode: '123456',
                name: 'Test Product',
                brand: 'Test Brand',
                type: 'Test Type',
                volume_unit: 'L',
            };

            jest.spyOn(productService, 'create').mockResolvedValue(mockCreatedProduct);
            jest.spyOn(productMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.saveProduct(mockCreateInput);

            expect(productService.create).toHaveBeenCalledWith(mockCreateInput);
            expect(productMapper.toOutput).toHaveBeenCalledWith(mockCreatedProduct);
            expect(result).toEqual(mockOutputDto);
        });
    });

    // Testes unitários para o endpoint de busca de produtos pelo código de barras
    describe('findProductByBarcode', () => {
        it('should find a product by barcode and return its output DTO', async () => {
            const mockBarcode = '12345';
            const mockFoundProduct = {
                codigo_barras: '12345',
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
            const mockOutputDto: ProductOutputDto = {
                barcode: '12345',
                name: 'Test Product',
                brand: 'Test Brand',
                type: 'Test Type',
                volume_unit: 'L',
            };

            jest.spyOn(productService, 'findByBarcode').mockResolvedValue(mockFoundProduct);
            jest.spyOn(productMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.findProductByBarcode(mockBarcode);

            expect(productService.findByBarcode).toHaveBeenCalledWith(mockBarcode);
            expect(productMapper.toOutput).toHaveBeenCalledWith(mockFoundProduct);
            expect(result).toEqual(mockOutputDto);
        });
    });

    // Testes unitários para o endpoint de atualização de produtos pelo código de barras
    describe('updateProductByBarcode', () => {
        it('should update a product by barcode and return its output DTO', async () => {
            const mockBarcode = '12345';
            const mockUpdateInput: ProductUpdateInputDto = {
                name: 'Updated Product',
                brand: 'Updated Brand',
                type: 'Updated Type',
                volume_unit: 'L',
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };
            const mockUpdatedProduct = {
                codigo_barras: mockBarcode,
                nome: 'Updated Product',
                marca: 'Updated Brand',
                tipo: 'Updated Type',
                unidade_volume: 'L',
            };
            const mockOutputDto: ProductOutputDto = {
                barcode: mockBarcode,
                name: 'Updated Product',
                brand: 'Updated Brand',
                type: 'Updated Type',
                volume_unit: 'L',
            };

            jest.spyOn(productService, 'updateByBarcode').mockResolvedValue(mockUpdatedProduct);
            jest.spyOn(productMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.updateProductByBarcode(mockBarcode, mockUpdateInput);

            expect(productService.updateByBarcode).toHaveBeenCalledWith(mockBarcode, mockUpdateInput);
            expect(productMapper.toOutput).toHaveBeenCalledWith(mockUpdatedProduct);
            expect(result).toEqual(mockOutputDto);
        });
    });

    // Testes unitários para o endpoint de remoção de produtos pelo código de barras
    describe('deleteProductByBarcode', () => {
        it('should delete a product by barcode and return a delete output DTO', async () => {
            const mockBarcode = '12345';
            const mockDeletedProduct = {
                codigo_barras: mockBarcode,
                nome: 'Test Product',
                marca: 'Test Brand',
                tipo: 'Test Type',
                unidade_volume: 'L',
            };
            const mockDeleteOutputDto: ProductDeleteOutputDto = {
                resourceId: mockBarcode,
                message: 'Produto removido com sucesso'
            };

            jest.spyOn(productService, 'deleteByBarcode').mockResolvedValue(mockDeletedProduct);
            jest.spyOn(productMapper, 'toDeleteOutput').mockReturnValue(mockDeleteOutputDto);

            const result = await controller.deleteProductByBarcode(mockBarcode);

            expect(productService.deleteByBarcode).toHaveBeenCalledWith(mockBarcode);
            expect(productMapper.toDeleteOutput).toHaveBeenCalledWith(mockDeletedProduct, 'Produto removido com sucesso');
            expect(result).toEqual(mockDeleteOutputDto);
        });
    });
});
