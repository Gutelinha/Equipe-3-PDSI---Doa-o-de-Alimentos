import { plainToInstance } from 'class-transformer';
import { CampaignOutputDto } from '../dto';
import { formatDateToString } from '../../utils/date-converter';

jest.mock('../../utils/date-converter', () => ({
    formatDateToString: jest.fn(),
}));

describe('CampaignOutputDto', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('@Transform (start_date and end_date)', () => {
        it('should transform "start_date" using formatDateToString', () => {
            const rawData = { nome: 'Campaign 1', ativa: true, data_inicio: new Date('2024-12-01') };
            const mockFormattedDate = '01/12/2024';

            // Mock da função formatDateToString
            (formatDateToString as jest.Mock).mockReturnValue(mockFormattedDate);

            const dto = plainToInstance(CampaignOutputDto, rawData);

            expect(formatDateToString).toHaveBeenCalledWith(new Date('2024-12-01'));
            expect(dto.start_date).toEqual(mockFormattedDate);
        });

        it('should transform "end_date" using formatDateToString', () => {
            const rawData = {
                nome: 'Campaign 2',
                ativa: true,
                data_inicio: new Date('2024-12-01'),
                data_fim: new Date('2024-12-31'),
            };
            const mockFormattedStartDate = '01/12/2024';
            const mockFormattedEndDate = '31/12/2024';

            // Mock da função formatDateToString
            (formatDateToString as jest.Mock)
                .mockImplementationOnce(() => mockFormattedStartDate)
                .mockImplementationOnce(() => mockFormattedEndDate);

            const dto = plainToInstance(CampaignOutputDto, rawData);

            expect(formatDateToString).toHaveBeenCalledWith(new Date('2024-12-31'));
            expect(dto.end_date).toEqual(mockFormattedEndDate);
        });
    });
});
