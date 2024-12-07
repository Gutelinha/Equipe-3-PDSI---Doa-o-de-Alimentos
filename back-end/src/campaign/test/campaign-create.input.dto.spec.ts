import { plainToInstance } from 'class-transformer';
import { CampaignCreateInputDto } from '../dto';
import { parseDateString } from '../../utils/date-converter';

jest.mock('../../utils/date-converter', () => ({
    parseDateString: jest.fn(),
}));

describe('CampaignCreateInputDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should transform "start_date" using parseDateString', () => {
        const rawData = { name: 'Campaign 1', start_date: '2024-12-01' };
        const mockParsedDate = new Date('2024-12-01');

        // Mock da função parseDateString
        (parseDateString as jest.Mock).mockReturnValue(mockParsedDate);

        const dto = plainToInstance(CampaignCreateInputDto, rawData);

        expect(parseDateString).toHaveBeenCalledWith('2024-12-01');
        expect(dto.start_date).toEqual(mockParsedDate);
    });

    it('should transform "end_date" using parseDateString if provided', () => {
        const rawData = {
            name: 'Campaign 2',
            start_date: '2024-12-01',
            end_date: '2024-12-31',
        };
        const mockParsedStartDate = new Date('2024-12-01');
        const mockParsedEndDate = new Date('2024-12-31');

        // Mock da função parseDateString
        (parseDateString as jest.Mock)
        .mockImplementationOnce(() => mockParsedStartDate)
        .mockImplementationOnce(() => mockParsedEndDate);

        const dto = plainToInstance(CampaignCreateInputDto, rawData);

        expect(parseDateString).toHaveBeenCalledWith('2024-12-01');
        expect(parseDateString).toHaveBeenCalledWith('2024-12-31');
        expect(dto.start_date).toEqual(mockParsedStartDate);
        expect(dto.end_date).toEqual(mockParsedEndDate);
    });

    it('should not call parseDateString for "end_date" if not provided', () => {
        const rawData = { name: 'Campaign 3', start_date: '2024-12-01' };
        const mockParsedDate = new Date('2024-12-01');

        // Mock da função parseDateString
        (parseDateString as jest.Mock).mockReturnValue(mockParsedDate);

        const dto = plainToInstance(CampaignCreateInputDto, rawData);

        expect(parseDateString).toHaveBeenCalledWith('2024-12-01');
        expect(parseDateString).toHaveBeenCalledTimes(1);
        expect(dto.end_date).toBeUndefined();
    });
});
