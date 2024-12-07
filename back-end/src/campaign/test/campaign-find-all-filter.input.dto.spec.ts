import { plainToInstance } from 'class-transformer';
import { CampaignFindAllFilterInputDto } from '../dto';
import { convertStringToBoolean } from '../../utils/boolean-converter';

jest.mock('../../utils/boolean-converter', () => ({
    convertStringToBoolean: jest.fn(),
}));

describe('CampaignFindAllFilterInputDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should transform "active" using convertStringToBoolean', () => {
        const rawData = { active: 'true' };
        const mockConvertedValue = true;

        // Mock da função convertStringToBoolean
        (convertStringToBoolean as jest.Mock).mockReturnValue(mockConvertedValue);

        const dto = plainToInstance(CampaignFindAllFilterInputDto, rawData);

        expect(convertStringToBoolean).toHaveBeenCalledWith('true');
        expect(dto.active).toEqual(mockConvertedValue);
    });

    it('should handle "active" when the value is "false"', () => {
        const rawData = { active: 'false' };
        const mockConvertedValue = false;

        // Mock da função convertStringToBoolean
        (convertStringToBoolean as jest.Mock).mockReturnValue(mockConvertedValue);

        const dto = plainToInstance(CampaignFindAllFilterInputDto, rawData);

        expect(convertStringToBoolean).toHaveBeenCalledWith('false');
        expect(dto.active).toEqual(mockConvertedValue);
    });

    it('should throw an error when "active" is not a boolean-compatible string', () => {
        const rawData = { active: 'invalid' };

        // Mock da função convertStringToBoolean para retornar undefined ou lançar erro
        (convertStringToBoolean as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid boolean string');
        });

        expect(() => plainToInstance(CampaignFindAllFilterInputDto, rawData)).toThrow(
        'Invalid boolean string',
        );
    });
});
