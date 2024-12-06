import { ProductUpdateInputDto } from '../dto';

describe('ProductUpdateInputDto', () => {
    describe('isEmpty', () => {
        it('should return true when all properties are null or undefined', () => {
            const dto = new ProductUpdateInputDto();
            expect(dto.isEmpty()).toBe(true);
        });

        it('should return false when "name" is set', () => {
            const dto = new ProductUpdateInputDto();
            dto.name = 'Product Name';
            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false when "brand" is set', () => {
            const dto = new ProductUpdateInputDto();
            dto.brand = 'Product Brand';
            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false when "type" is set', () => {
            const dto = new ProductUpdateInputDto();
            dto.type = 'Product Type';
            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false when "volume_unit" is set', () => {
            const dto = new ProductUpdateInputDto();
            dto.volume_unit = 'liters';
            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false when multiple properties are set', () => {
            const dto = new ProductUpdateInputDto();
            dto.name = 'Product Name';
            dto.brand = 'Product Brand';
            expect(dto.isEmpty()).toBe(false);
        });
    });
});
