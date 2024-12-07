import { CampaignMapper } from '../campaign.mapper';
import { CampaignOutputDto, CampaignDeleteOutputDto } from '../dto';
import { campanha as CampaignModel } from '@prisma/client';

describe('CampaignMapper', () => {
    let mapper: CampaignMapper;

    beforeEach(() => {
        mapper = new CampaignMapper();
    });

    describe('toOutput', () => {
        it('should transform a CampaignModel into a CampaignOutputDto', () => {
            const campaignModel = {
                nome: 'Campaign Name',
                ativa: true,
                data_inicio: new Date('2024-12-01'),
                data_fim: new Date('2024-12-31'),
            };

            const result = mapper.toOutput(campaignModel);
            
            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(CampaignOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.name).toBe('Campaign Name');
            expect(result.active).toBe(true);
        });
    });

    describe('toDeleteOutput', () => {
        it('should transform a CampaignModel into a CampaignDeleteOutputDto with a custom message', () => {
            const campaignModel: CampaignModel = {
                nome: 'Campaign Name',
                ativa: false,
                data_inicio: new Date('2024-01-01'),
                data_fim: null,
            };
            const customMessage = 'Campaign deleted successfully';

            const result = mapper.toDeleteOutput(campaignModel, customMessage);

            // Verifica se o resultado é uma instância do DTO
            expect(result).toBeInstanceOf(CampaignDeleteOutputDto);

            // Verifica se os valores foram mapeados corretamente
            expect(result.resourceId).toBe('Campaign Name');
            expect(result.message).toBe(customMessage);
        });
    });
});
