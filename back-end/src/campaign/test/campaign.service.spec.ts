import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from '../campaign.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CampaignCreateInputDto, CampaignUpdateInputDto } from '../dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('CampaignService', () => {
    let service: CampaignService;
    let prisma: PrismaService;

    const mockPrismaService = {
        campanha: {
            create: jest.fn(),
            findUnique: jest.fn(),
            findMany: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CampaignService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<CampaignService>(CampaignService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testes unitários para a criação de campanhas
    describe('create', () => {
        it('should create a campaign successfully', async () => {
            const mockInput: CampaignCreateInputDto = {
                name: 'New Campaign',
                start_date: new Date('2024-01-01'),
            };

            const mockCampaign = {
                nome: 'New Campaign',
                data_inicio: mockInput.start_date,
                data_fim: mockInput.end_date,
            };

            mockPrismaService.campanha.create.mockResolvedValue(mockCampaign);

            const result = await service.create(mockInput);

            expect(prisma.campanha.create).toHaveBeenCalledWith({
                data: {
                    nome: mockInput.name,
                    data_inicio: mockInput.start_date,
                    data_fim: mockInput.end_date,
                },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should throw BadRequestException if start_date is after end_date', async () => {
            const invalidInput: CampaignCreateInputDto = {
                name: 'Invalid Campaign',
                start_date: new Date('2024-02-01'),
                end_date: new Date('2024-01-01'),
            };

            await expect(service.create(invalidInput)).rejects.toThrow(
                BadRequestException,
            );

            expect(prisma.campanha.create).not.toHaveBeenCalled();
        });
    });

    // Testes unitários para a busca de campanhas pelo nome
    describe('findByName', () => {
        it('should find a campaign by name', async () => {
            const mockName = 'Existing Campaign';
            const mockCampaign = {
                nome: mockName,
                data_inicio: new Date('2024-01-01'),
                data_fim: new Date('2024-02-01'),
            };

            mockPrismaService.campanha.findUnique.mockResolvedValue(mockCampaign);

            const result = await service.findByName(mockName);

            expect(prisma.campanha.findUnique).toHaveBeenCalledWith({
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should throw NotFoundException if campaign does not exist', async () => {
            mockPrismaService.campanha.findUnique.mockResolvedValue(null);

            await expect(service.findByName('Nonexistent Campaign')).rejects.toThrow(
                NotFoundException,
            );

            expect(prisma.campanha.findUnique).toHaveBeenCalled();
        });
    });

    // Testes unitários para a busca de campanhas pelo campo 'ativa'
    describe('findAllByActive', () => {
        it('should return campaigns by active status', async () => {
            const mockActive = true;
            const mockCampaigns = [
                { ativa: true, nome: 'Campaign 1' },
                { ativa: true, nome: 'Campaign 2' },
            ];

            mockPrismaService.campanha.findMany.mockResolvedValue(mockCampaigns);

            const result = await service.findAllByActive(mockActive);

            expect(prisma.campanha.findMany).toHaveBeenCalledWith({
                where: { ativa: mockActive },
            });

            expect(result).toEqual(mockCampaigns);
        });

        it('should throw NotFoundException if no campaigns are found', async () => {
            mockPrismaService.campanha.findMany.mockResolvedValue([]);

            await expect(service.findAllByActive(true)).rejects.toThrow(
                NotFoundException,
            );

            expect(prisma.campanha.findMany).toHaveBeenCalled();
        });
    });

    // Testes unitários para a atualização de campanhas pelo nome
    describe('updateByName', () => {
        it('should update a campaign successfully', async () => {
            const mockName = 'Campaign';
            const mockInput: CampaignUpdateInputDto = {
                active: true,
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };

            const mockCampaign = {
                nome: mockName,
                ativa: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
            };

            mockPrismaService.campanha.findUnique.mockResolvedValue(mockCampaign);
            mockPrismaService.campanha.update.mockResolvedValue(mockCampaign);

            const result = await service.updateByName(mockName, mockInput);

            expect(prisma.campanha.update).toHaveBeenCalledWith({
                data: {
                    ativa: mockInput.active,
                    data_inicio: mockInput.start_date,
                    data_fim: mockInput.end_date,
                },
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should update a campaign successfully when both dates are valid', async () => {
            const mockName = 'Campaign';
            const mockInput: CampaignUpdateInputDto = {
                active: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };

            const mockCampaign = {
                nome: mockName,
                ativa: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
            };

            mockPrismaService.campanha.findUnique.mockResolvedValue(mockCampaign);
            mockPrismaService.campanha.update.mockResolvedValue(mockCampaign);

            const result = await service.updateByName(mockName, mockInput);

            expect(prisma.campanha.update).toHaveBeenCalledWith({
                data: {
                    ativa: mockInput.active,
                    data_inicio: mockInput.start_date,
                    data_fim: mockInput.end_date,
                },
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should update a campaign successfully when start date is valid', async () => {
            const mockName = 'Campaign';
            const mockInput: CampaignUpdateInputDto = {
                active: true,
                start_date: new Date('2024-01-01'),
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };

            const mockCampaign = {
                nome: mockName,
                ativa: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
            };

            mockPrismaService.campanha.findUnique.mockResolvedValue(mockCampaign);
            mockPrismaService.campanha.update.mockResolvedValue(mockCampaign);

            const result = await service.updateByName(mockName, mockInput);

            expect(prisma.campanha.update).toHaveBeenCalledWith({
                data: {
                    ativa: mockInput.active,
                    data_inicio: mockInput.start_date,
                    data_fim: mockInput.end_date,
                },
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should update a campaign successfully when end date is valid', async () => {
            const mockName = 'Campaign';
            const mockInput: CampaignUpdateInputDto = {
                active: true,
                end_date: new Date('2024-02-01'),
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };

            const mockCampaign = {
                nome: mockName,
                ativa: true,
                start_date: new Date('2024-01-01'),
                end_date: new Date('2024-02-01'),
            };

            mockPrismaService.campanha.findUnique.mockResolvedValue(mockCampaign);
            mockPrismaService.campanha.update.mockResolvedValue(mockCampaign);

            const result = await service.updateByName(mockName, mockInput);

            expect(prisma.campanha.update).toHaveBeenCalledWith({
                data: {
                    ativa: mockInput.active,
                    data_inicio: mockInput.start_date,
                    data_fim: mockInput.end_date,
                },
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });

        it('should throw BadRequestException if input is empty', async () => {
            const mockName = 'Campaign';
            const mockInput: CampaignUpdateInputDto = {
                active: null,
                start_date: null,
                end_date: null,
                isEmpty: jest.fn(() => true), // Simula o método isEmpty retornando true
            };

            await expect(service.updateByName(mockName, mockInput)).rejects.toThrow(
                BadRequestException,
            );
        });

        it('should throw BadRequestException if start_date is after end_date', async () => {
            const mockName = 'Invalid Campaign';
            const invalidInput: CampaignUpdateInputDto = {
                active: true,
                start_date: new Date('2024-02-01'),
                end_date: new Date('2024-01-01'),
                isEmpty: jest.fn(() => false), // Simulando o método isEmpty do DTO
            };

            await expect(service.updateByName(mockName, invalidInput)).rejects.toThrow(
                BadRequestException,
            );

            expect(prisma.campanha.update).not.toHaveBeenCalled();
        });
    });

    // Testes unitários para a remoção de campanhas pelo nome
    describe('deleteByName', () => {
        it('should delete a campaign by name', async () => {
            const mockName = 'Campaign';
            const mockCampaign = { nome: mockName };

            mockPrismaService.campanha.delete.mockResolvedValue(mockCampaign);

            const result = await service.deleteByName(mockName);

            expect(prisma.campanha.delete).toHaveBeenCalledWith({
                where: { nome: mockName },
            });

            expect(result).toEqual(mockCampaign);
        });
    });
});
