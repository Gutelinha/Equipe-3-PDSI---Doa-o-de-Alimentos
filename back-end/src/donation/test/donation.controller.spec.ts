import { Test, TestingModule } from '@nestjs/testing';
import { DonationController } from '../donation.controller';
import { DonationService } from '../donation.service';
import { DonationMapper } from '../donation.mapper';
import { DonationInputDto, DonationKeyInputDto, DonationOutputDto, DonationDeleteOutputDto } from '../dto';
import { BadRequestException } from '@nestjs/common';

describe('DonationController', () => {
    let controller: DonationController;
    let donationService: DonationService;
    let donationMapper: DonationMapper;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        controllers: [DonationController],
        providers: [
            {
                provide: DonationService,
                useValue: {
                    create: jest.fn(),
                    findByKey: jest.fn(),
                    findAllByProductBarcode: jest.fn(),
                    findAllByCampaignName: jest.fn(),
                    updateByKey: jest.fn(),
                    deleteByKey: jest.fn(),
                },
            },
            {
                provide: DonationMapper,
                useValue: {
                    toOutput: jest.fn(),
                    toDeleteOutput: jest.fn(),
                },
            },
        ],
        }).compile();

        controller = module.get<DonationController>(DonationController);
        donationService = module.get<DonationService>(DonationService);
        donationMapper = module.get<DonationMapper>(DonationMapper);
    });

    describe('createDonation', () => {
        it('should throw BadRequestException if the key is incomplete', async () => {
            const mockInput: DonationInputDto = { 
                key: { 
                    productBarcode: null,
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: () => true, 
                    getIncompleteKeyMessage: () => `Tanto o código do produto quanto o nome da campanha devem ser informados`
                }, 
                quantity: 100
            };

            await expect(controller.createDonation(mockInput)).rejects.toThrow(BadRequestException);
        });

        it('should create a donation and return its output DTO', async () => {
            const mockInput: DonationInputDto = { 
                key: { 
                    productBarcode: '123456',
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: () => false, 
                    getIncompleteKeyMessage: () => null
                }, 
                quantity: 100
            };
            const mockCreatedDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: mockInput.quantity,
            };
            const mockOutputDto: DonationOutputDto = {
                productBarcode: mockInput.key.productBarcode,
                campaignName: mockInput.key.campaignName,
                quantity: mockInput.quantity
            };

            jest.spyOn(donationService, 'create').mockResolvedValue(mockCreatedDonation);
            jest.spyOn(donationMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.createDonation(mockInput);

            expect(donationService.create).toHaveBeenCalledWith(mockInput);
            expect(donationMapper.toOutput).toHaveBeenCalledWith(mockCreatedDonation);
            expect(result).toEqual(mockOutputDto);
        });
    });

    describe('findDonation', () => {
        it('should throw BadRequestException if the key is empty', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: null,
                campaignName: null,
                isEmpty: jest.fn(() => true),
                isIncomplete: jest.fn(() => true),
                getIncompleteKeyMessage: jest.fn(() => null),
            };

            await expect(controller.findDonation(mockKey)).rejects.toThrow(BadRequestException);
        });

        it('should find a donation by key if both productBarcode and campaignName are provided', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: '123456',
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => false),
                getIncompleteKeyMessage: jest.fn(() => null),
            };
            const mockFoundDonation = {
                codigo_barras_produto: mockKey.productBarcode,
                nome_campanha: mockKey.campaignName,
                quantidade: 10,
            };
            const mockOutputDto: DonationOutputDto = {
                productBarcode: mockKey.productBarcode,
                campaignName: mockKey.campaignName,
                quantity: 10
            };

            jest.spyOn(donationService, 'findByKey').mockResolvedValue(mockFoundDonation);
            jest.spyOn(donationMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.findDonation(mockKey);

            expect(donationService.findByKey).toHaveBeenCalledWith(mockKey);
            expect(donationMapper.toOutput).toHaveBeenCalledWith(mockFoundDonation);
            expect(result).toEqual(mockOutputDto);
        });

        it('should find all donations for a product if only productBarcode is provided', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: '123456',
                campaignName: null,
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => true),
                getIncompleteKeyMessage: jest.fn(() => null),
            };
            const mockDonations = [
                { codigo_barras_produto: '123456', nome_campanha: 'Campaign 1', quantidade: 1 },
                { codigo_barras_produto: '123456', nome_campanha: 'Campaign 2', quantidade: 2 }
            ];
            const mockOutputDtos: DonationOutputDto[] = mockDonations.map(donation => ({
                productBarcode: donation.codigo_barras_produto,
                campaignName: donation.nome_campanha,
                quantity: donation.quantidade
            }));

            jest.spyOn(donationService, 'findAllByProductBarcode').mockResolvedValue(mockDonations);
            jest.spyOn(donationMapper, 'toOutput').mockImplementation(donation => ({
                productBarcode: donation.codigo_barras_produto,
                campaignName: donation.nome_campanha,
                quantity: donation.quantidade
            }));

            const result = await controller.findDonation(mockKey);

            expect(donationService.findAllByProductBarcode).toHaveBeenCalledWith('123456');
            expect(result).toEqual(mockOutputDtos);
        });

        it('should find all donations for a campaign if only campaignName is provided', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: null,
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => true),
                getIncompleteKeyMessage: jest.fn(() => null),
            };
            const mockDonations = [
                { codigo_barras_produto: '123456', nome_campanha: 'Campaign 1', quantidade: 1 },
                { codigo_barras_produto: '789101', nome_campanha: 'Campaign 1', quantidade: 2 }
            ];
            const mockOutputDtos: DonationOutputDto[] = mockDonations.map(donation => ({
                productBarcode: donation.codigo_barras_produto,
                campaignName: donation.nome_campanha,
                quantity: donation.quantidade
            }));

            jest.spyOn(donationService, 'findAllByCampaignName').mockResolvedValue(mockDonations);
            jest.spyOn(donationMapper, 'toOutput').mockImplementation(donation => ({
                productBarcode: donation.codigo_barras_produto,
                campaignName: donation.nome_campanha,
                quantity: donation.quantidade
            }));

            const result = await controller.findDonation(mockKey);

            expect(donationService.findAllByCampaignName).toHaveBeenCalledWith('Campaign 1');
            expect(result).toEqual(mockOutputDtos);
        });
    });

    describe('updateDonationByKey', () => {
        it('should throw BadRequestException if the key is incomplete', async () => {
            const mockInput: DonationInputDto = { 
                key: { 
                    productBarcode: null,
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: () => true, 
                    getIncompleteKeyMessage: () => `Tanto o código do produto quanto o nome da campanha devem ser informados`
                }, 
                quantity: 100
            };

            await expect(controller.updateDonationByKey(mockInput)).rejects.toThrow(BadRequestException);
        });

        it('should update a donation by key and return its output DTO', async () => {
            const mockInput: DonationInputDto = { 
                key: { 
                    productBarcode: '123456',
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: () => false, 
                    getIncompleteKeyMessage: () => null
                },
                quantity: 100
            };
            const mockUpdatedDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: mockInput.quantity,
            };
            const mockOutputDto: DonationOutputDto = {
                productBarcode: mockInput.key.productBarcode,
                campaignName: mockInput.key.campaignName,
                quantity: mockInput.quantity
            };

            jest.spyOn(donationService, 'updateByKey').mockResolvedValue(mockUpdatedDonation);
            jest.spyOn(donationMapper, 'toOutput').mockReturnValue(mockOutputDto);

            const result = await controller.updateDonationByKey(mockInput);

            expect(donationService.updateByKey).toHaveBeenCalledWith(mockInput);
            expect(donationMapper.toOutput).toHaveBeenCalledWith(mockUpdatedDonation);
            expect(result).toEqual(mockOutputDto);
        });
    });

    describe('deleteDonationByKey', () => {
        it('should throw BadRequestException if the key is incomplete', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: null,
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: () => true,
                getIncompleteKeyMessage: () => `Tanto o código do produto quanto o nome da campanha devem ser informados`,
            };

            await expect(controller.deleteDonationByKey(mockKey)).rejects.toThrow(BadRequestException);
        });

        it('should delete a donation by key and return a delete output DTO', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: '123456',
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => false),
                getIncompleteKeyMessage: jest.fn(() => null),
            };
            const mockDeletedDonation = {
                codigo_barras_produto: mockKey.productBarcode,
                nome_campanha: mockKey.campaignName,
                quantidade: 10,
            };
            const deleteOutputDto: DonationDeleteOutputDto = {
                resourceId: mockKey,
                message: 'Doação removida com sucesso'
            };

            jest.spyOn(donationService, 'deleteByKey').mockResolvedValue(mockDeletedDonation);
            jest.spyOn(donationMapper, 'toDeleteOutput').mockReturnValue(deleteOutputDto);

            const result = await controller.deleteDonationByKey(mockKey);

            expect(donationService.deleteByKey).toHaveBeenCalledWith(mockKey);
            expect(donationMapper.toDeleteOutput).toHaveBeenCalledWith(mockDeletedDonation, 'Doação removida com sucesso');
            expect(result).toEqual(deleteOutputDto);
        });
    });
});
