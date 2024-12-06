import { ProductMapper } from '../product.mapper';
import { ProductOutputDto, ProductDeleteOutputDto } from '../dto';

describe('ProductMapper', () => {
    let productMapper: ProductMapper;

    beforeEach(() => {
        productMapper = new ProductMapper();
    });

    describe('toOutput', () => {
        it('should correctly map ProductModel to ProductOutputDto', () => {
            const productModel = {
                codigo_barras: '12345',
                nome: 'Product 1',
                marca: 'Brand A',
                tipo: 'Type X',
                unidade_volume: 'L',
            };

            const result = productMapper.toOutput(productModel);

            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(ProductOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.barcode).toBe('12345');
            expect(result.name).toBe('Product 1');
            expect(result.brand).toBe('Brand A');
            expect(result.type).toBe('Type X');
            expect(result.volume_unit).toBe('L');
        });
    });

    describe('toDeleteOutput', () => {
        it('should correctly map ProductModel to ProductDeleteOutputDto and add a custom message', () => {
            const productModel = {
                codigo_barras: '12345',
                nome: 'Product 1',
                marca: 'Brand A',
                tipo: 'Type X',
                unidade_volume: 'L',
            };
            const customMessage = 'Product deleted successfully';

            const result = productMapper.toDeleteOutput(productModel, customMessage);

            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(ProductDeleteOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.resourceId).toBe('12345');
            expect(result.message).toBe(customMessage);
        });
    });
});
