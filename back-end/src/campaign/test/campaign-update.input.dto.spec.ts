import { plainToInstance } from 'class-transformer';
import { CampaignUpdateInputDto } from '../dto';
import { parseDateString } from '../../utils/date-converter';

jest.mock('../../utils/date-converter', () => ({
    parseDateString: jest.fn(),
}));

describe('CampaignUpdateInputDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('@Transform (start_date and end_date)', () => {
        it('should transform "start_date" using parseDateString', () => {
            const rawData = { start_date: '2024-12-01' };
            const mockParsedDate = new Date('2024-12-01');

            (parseDateString as jest.Mock).mockReturnValue(mockParsedDate);

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(parseDateString).toHaveBeenCalledWith('2024-12-01');
            expect(dto.start_date).toEqual(mockParsedDate);
        });

        it('should transform "end_date" using parseDateString', () => {
            const rawData = { end_date: '2024-12-31' };
            const mockParsedDate = new Date('2024-12-31');

            (parseDateString as jest.Mock).mockReturnValue(mockParsedDate);

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(parseDateString).toHaveBeenCalledWith('2024-12-31');
            expect(dto.end_date).toEqual(mockParsedDate);
        });

        it('should not call parseDateString if "start_date" or "end_date" are not provided', () => {
            const rawData = {};

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(parseDateString).not.toHaveBeenCalled();
            expect(dto.start_date).toBeUndefined();
            expect(dto.end_date).toBeUndefined();
        });
    });

    describe('isEmpty()', () => {
        it('should return true if all properties are null or undefined', () => {
            const rawData = {};

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(dto.isEmpty()).toBe(true);
        });

        it('should return false if "active" is set', () => {
            const rawData = { active: true };

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false if "start_date" is set', () => {
            const rawData = { start_date: '2024-12-01' };
            (parseDateString as jest.Mock).mockReturnValue(new Date('2024-12-01'));

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false if "end_date" is set', () => {
            const rawData = { end_date: '2024-12-31' };
            (parseDateString as jest.Mock).mockReturnValue(new Date('2024-12-31'));

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(dto.isEmpty()).toBe(false);
        });

        it('should return false if multiple properties are set', () => {
            const rawData = { active: false, start_date: '2024-12-01', end_date: '2024-12-31' };
            (parseDateString as jest.Mock)
                .mockImplementationOnce(() => new Date('2024-12-01'))
                .mockImplementationOnce(() => new Date('2024-12-31'));

            const dto = plainToInstance(CampaignUpdateInputDto, rawData);

            expect(dto.isEmpty()).toBe(false);
        });
    });
});
