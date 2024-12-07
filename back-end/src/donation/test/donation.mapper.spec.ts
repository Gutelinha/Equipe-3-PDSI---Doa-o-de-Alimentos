import { DonationMapper } from "../donation.mapper";
import { DonationDeleteOutputDto, DonationOutputDto } from "../dto";

describe('DonationMapper', () => {
    let mapper: DonationMapper;

    beforeEach(() => {
        mapper = new DonationMapper();
    });

    describe('toOutput', () => {
        it('should transform a DonationModel into a DonationOutputDto', () => {
            const donationModel = {
                codigo_barras_produto: '12345',
                nome_campanha: 'Campaign Name',
                quantidade: 2,
            }

            const result = mapper.toOutput(donationModel);

            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(DonationOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.productBarcode).toBe('12345');
            expect(result.campaignName).toBe('Campaign Name');
            expect(result.quantity).toBe(2);
        });
    });

    describe('toDeleteOutput', () => {
        it('should transform a DonationModel into a DonationDeleteOutputDto with a custom message', () => {
            const donationModel = {
                codigo_barras_produto: '12345',
                nome_campanha: 'Campaign Name',
                quantidade: 2,
            }
            const customMessage = 'Donation deleted successfully';

            const result = mapper.toDeleteOutput(donationModel, customMessage);

            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(DonationDeleteOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.resourceId.productBarcode).toBe('12345');
            expect(result.resourceId.campaignName).toBe('Campaign Name');
            expect(result.message).toBe(customMessage);
        });
    });
});