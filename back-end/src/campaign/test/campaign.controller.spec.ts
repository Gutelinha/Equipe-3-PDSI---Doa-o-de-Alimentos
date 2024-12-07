import { Test, TestingModule } from '@nestjs/testing';
import { CampaignController } from '../campaign.controller';
import { CampaignService } from '../campaign.service';
import { CampaignMapper } from '../campaign.mapper';
import { 
    CampaignCreateInputDto, 
    CampaignUpdateInputDto, 
    CampaignFindAllFilterInputDto, 
    CampaignOutputDto, 
    CampaignDeleteOutputDto 
} from '../dto';

describe('CampaignController', () => {
    let controller: CampaignController;
    let campaignService: CampaignService;
    let campaignMapper: CampaignMapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CampaignController],
            providers: [
                {
                    provide: CampaignService,
                    useValue: {
                        create: jest.fn(),
                        findByName: jest.fn(),
                        findAllByActive: jest.fn(),
                        updateByName: jest.fn(),
                        deleteByName: jest.fn(),
                    },
                },
                {
                    provide: CampaignMapper,
                    useValue: {
                        toOutput: jest.fn(),
                        toDeleteOutput: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<CampaignController>(CampaignController);
        campaignService = module.get<CampaignService>(CampaignService);
        campaignMapper = module.get<CampaignMapper>(CampaignMapper);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createCampaign', () => {
        it('should create a campaign and return its output DTO', async () => {
            const mockCreateInput: CampaignCreateInputDto = {
                name: 'New Campaign',
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
            };
            const mockCreatedCampaign = {
                nome: 'New Campaign',
                ativa: true,
                data_inicio: new Date('2024-01-01'),
                data_fim: new Date('2024-02-01'),
            };
            const mockOutputDto: CampaignOutputDto = {
                name: 'New Campaign',
                active: true,
                start_date: '01/01/2024',
                end_date: '01/02/2024',
            };

            jest.spyOn(campaignService, 'create').mockResolvedValue(mockCreatedCampaign);
            jest.spyOn(campaignMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.createCampaign(mockCreateInput);

            expect(campaignService.create).toHaveBeenCalledWith(mockCreateInput);
            expect(campaignMapper.toOutput).toHaveBeenCalledWith(mockCreatedCampaign);
            expect(result).toEqual(mockOutputDto);
        });
    });

    describe('findCampaignByName', () => {
        it('should find a campaign by name and return its output DTO', async () => {
            const mockName = 'Campaign 1';
            const mockFoundCampaign = {
                nome: 'New Campaign',
                ativa: true,
                data_inicio: new Date('2024-01-01'),
                data_fim: new Date('2024-02-01'),
            };
            const mockOutputDto: CampaignOutputDto = {
                name: 'New Campaign',
                active: true,
                start_date: '01/01/2024',
                end_date: '01/02/2024',
            };

            jest.spyOn(campaignService, 'findByName').mockResolvedValue(mockFoundCampaign);
            jest.spyOn(campaignMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.findCampaignByName(mockName);

            expect(campaignService.findByName).toHaveBeenCalledWith(mockName);
            expect(campaignMapper.toOutput).toHaveBeenCalledWith(mockFoundCampaign);
            expect(result).toEqual(mockOutputDto);
        });
    });

    describe('findAllActiveCampaigns', () => {
        it('should return a list of active campaigns', async () => {
            const mockInput: CampaignFindAllFilterInputDto = { active: true };
            const mockActiveCampaigns = [
                { nome: 'Campaign 1', ativa: true, data_inicio: new Date('2024-01-01'), data_fim: null },
                { nome: 'Campaign 2', ativa: true, data_inicio: new Date('2024-01-01'), data_fim: null },
            ];

            const mockOutputDtos: CampaignOutputDto[] = mockActiveCampaigns.map(campaign => ({
                name: campaign.nome,
                active: campaign.ativa,
                start_date: '01/01/2024'
            }));

            jest.spyOn(campaignService, 'findAllByActive').mockResolvedValue(mockActiveCampaigns);
            jest.spyOn(campaignMapper, 'toOutput').mockImplementation(campaign => ({
                name: campaign.nome,
                active: campaign.ativa,
                start_date: '01/01/2024'
            }));

            const result = await controller.findAllActiveCampaigns(mockInput);

            expect(campaignService.findAllByActive).toHaveBeenCalledWith(mockInput.active);
            expect(result).toEqual(mockOutputDtos);
        });
    });

    describe('updateCampaignByName', () => {
        it('should update a campaign by name and return its output DTO', async () => {
            const mockName = 'Campaign 1';
            const mockUpdateInput: CampaignUpdateInputDto = {
                active: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };
            const mockUpdatedCampaign = {
                nome: mockName,
                ativa: true,
                data_inicio: new Date('2024-01-01'),
                data_fim: new Date('2024-02-01'),
            };
            const mockOutputDto: CampaignOutputDto = {
                name: 'New Campaign',
                active: true,
                start_date: '01/01/2024',
                end_date: '01/02/2024',
            };

            jest.spyOn(campaignService, 'updateByName').mockResolvedValue(mockUpdatedCampaign);
            jest.spyOn(campaignMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.updateCampaignByName(mockName, mockUpdateInput);

            expect(campaignService.updateByName).toHaveBeenCalledWith(mockName, mockUpdateInput);
            expect(campaignMapper.toOutput).toHaveBeenCalledWith(mockUpdatedCampaign);
            expect(result).toEqual(mockOutputDto);
        });
    });

    describe('deleteCampaignByName', () => {
        it('should delete a campaign by name and return a delete output DTO', async () => {
            const mockName = 'Campaign 1';
            const mockDeletedCampaign = {
                nome: mockName,
                ativa: true,
                data_inicio: new Date('2024-01-01'),
                data_fim: new Date('2024-02-01'),
            };
            const mockDeleteOutputDto: CampaignDeleteOutputDto = {
                resourceId: mockName,
                message: 'Campanha removida com sucesso'
            };

            jest.spyOn(campaignService, 'deleteByName').mockResolvedValue(mockDeletedCampaign);
            jest.spyOn(campaignMapper, 'toDeleteOutput').mockReturnValue(mockDeleteOutputDto);

            const result = await controller.deleteCampaignByName(mockName);

            expect(campaignService.deleteByName).toHaveBeenCalledWith(mockName);
            expect(campaignMapper.toDeleteOutput).toHaveBeenCalledWith(mockDeletedCampaign, 'Campanha removida com sucesso');
            expect(result).toEqual(mockDeleteOutputDto);
        });
    });
});
