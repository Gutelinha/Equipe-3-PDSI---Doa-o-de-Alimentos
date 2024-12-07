import { Test, TestingModule } from '@nestjs/testing';
import { DonationService } from '../donation.service';
import { PrismaService } from '../../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { DonationInputDto, DonationKeyInputDto } from '../dto';

describe('DonationService', () => {
    let service: DonationService;
    let prisma: PrismaService;

    const mockPrismaService = {
        doacao: {
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
                DonationService,
                { provide: PrismaService, useValue: mockPrismaService },
            ],
        }).compile();

        service = module.get<DonationService>(DonationService);
        prisma = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Testes unitários para a criação de doações
    describe('create', () => {
        it('should create a new donation', async () => {
            const mockInput: DonationInputDto = {
                key: {
                    productBarcode: '123456',
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: jest.fn(() => false),
                    getIncompleteKeyMessage: jest.fn(() => null),
                },
                quantity: 10,
            };

            const mockDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: mockInput.quantity,
            };

            mockPrismaService.doacao.findUnique.mockResolvedValue(null);
            mockPrismaService.doacao.create.mockResolvedValue(mockDonation);

            const result = await service.create(mockInput);

            expect(prisma.doacao.create).toHaveBeenCalledWith({
                data: {
                    codigo_barras_produto: mockInput.key.productBarcode,
                    nome_campanha: mockInput.key.campaignName,
                    quantidade: mockInput.quantity,
                },
            });

            expect(result).toEqual(mockDonation);
        });

        it('should update quantity if donation already exists', async () => {
            const mockInput: DonationInputDto = {
                key: {
                    productBarcode: '123456',
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: jest.fn(() => false),
                    getIncompleteKeyMessage: jest.fn(() => null),
                },
                quantity: 10,
            };

            const mockFoundDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: 15,
            };

            const mockUpdatedDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: 25,
            };

            mockPrismaService.doacao.findUnique.mockResolvedValue(mockFoundDonation);
            mockPrismaService.doacao.update.mockResolvedValue(mockUpdatedDonation);

            const result = await service.create(mockInput);

            expect(prisma.doacao.findUnique).toHaveBeenCalledWith({
                where: {
                    nome_campanha_codigo_barras_produto: {
                        nome_campanha: mockInput.key.campaignName,
                        codigo_barras_produto: mockInput.key.productBarcode,
                    },
                },
            });
            expect(result).toEqual(mockUpdatedDonation);
        });
    });

    // Testes unitários para a busca de doações pela chave composta
    describe('findByKey', () => {
        it('should find a donation by key', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: '123456',
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => false),
                getIncompleteKeyMessage: jest.fn(() => null),
            };

            const mockDonation = {
                codigo_barras_produto: mockKey.productBarcode,
                nome_campanha: mockKey.campaignName,
                quantidade: 10,
            };

            mockPrismaService.doacao.findUnique.mockResolvedValue(mockDonation);

            const result = await service.findByKey(mockKey);

            expect(prisma.doacao.findUnique).toHaveBeenCalledWith({
                where: {
                    nome_campanha_codigo_barras_produto: {
                        nome_campanha: mockKey.campaignName,
                        codigo_barras_produto: mockKey.productBarcode,
                    },
                },
            });

            expect(result).toEqual(mockDonation);
        });

        it('should throw NotFoundException if donation is not found', async () => {
            const mockKey: DonationKeyInputDto = {
                productBarcode: '123456',
                campaignName: 'Campaign 1',
                isEmpty: jest.fn(() => false),
                isIncomplete: jest.fn(() => false),
                getIncompleteKeyMessage: jest.fn(() => null),
            };

            mockPrismaService.doacao.findUnique.mockResolvedValue(null);

            await expect(service.findByKey(mockKey)).rejects.toThrow(NotFoundException);
        });
    });

    // Testes unitários para a busca de doações pelo código de barras do produto
    describe('findAllByProductBarcode', () => {
        it('should return all donations for a product', async () => {
            const mockBarcode = '123456';
            const mockDonations = [
                { codigo_barras_produto: mockBarcode, nome_campanha: 'Campaign 1', quantidade: 10 },
                { codigo_barras_produto: mockBarcode, nome_campanha: 'Campaign 2', quantidade: 5 },
            ];

            mockPrismaService.doacao.findMany.mockResolvedValue(mockDonations);

            const result = await service.findAllByProductBarcode(mockBarcode);

            expect(prisma.doacao.findMany).toHaveBeenCalledWith({
                where: { codigo_barras_produto: mockBarcode },
            });
            expect(result).toEqual(mockDonations);
        });

        it('should throw NotFoundException if no donations are found', async () => {
            const mockBarcode = '123456';

            mockPrismaService.doacao.findMany.mockResolvedValue([]);

            await expect(service.findAllByProductBarcode(mockBarcode)).rejects.toThrow(NotFoundException);
        });
    });

    // Testes unitários para a busca de doações pelo nome da campanha
    describe('findAllByCampaignName', () => {
        it('should return all donations for a campaign', async () => {
            const mockName = 'Campaign 1';
            const mockDonations = [
                { codigo_barras_produto: '12345', nome_campanha: mockName, quantidade: 10 },
                { codigo_barras_produto: '67890', nome_campanha: mockName, quantidade: 5 },
            ];

            mockPrismaService.doacao.findMany.mockResolvedValue(mockDonations);

            const result = await service.findAllByCampaignName(mockName);

            expect(prisma.doacao.findMany).toHaveBeenCalledWith({
                where: { nome_campanha: mockName },
            });
            expect(result).toEqual(mockDonations);
        });

        it('should throw NotFoundException if no donations are found', async () => {
            const mockName = 'Campaign 1';

            mockPrismaService.doacao.findMany.mockResolvedValue([]);

            await expect(service.findAllByCampaignName(mockName)).rejects.toThrow(NotFoundException);
        });
    });

    // Testes unitários para a atualização de doações pela chave composta
    describe('updateByKey', () => {
        it('should update a donation successfully', async () => {
            const mockInput: DonationInputDto = {
                key: {
                    productBarcode: '123456',
                    campaignName: 'Campaign 1',
                    isEmpty: jest.fn(() => false),
                    isIncomplete: jest.fn(() => false),
                    getIncompleteKeyMessage: jest.fn(() => null),
                },
                quantity: 15,
            };

            const mockUpdatedDonation = {
                codigo_barras_produto: mockInput.key.productBarcode,
                nome_campanha: mockInput.key.campaignName,
                quantidade: 15,
            };

            mockPrismaService.doacao.update.mockResolvedValue(mockUpdatedDonation);

            const result = await service.updateByKey(mockInput);

            expect(prisma.doacao.update).toHaveBeenCalledWith({
                data: { quantidade: mockInput.quantity },
                where: {
                    nome_campanha_codigo_barras_produto: {
                        nome_campanha: mockInput.key.campaignName,
                        codigo_barras_produto: mockInput.key.productBarcode,
                    },
                },
            });
            expect(result).toEqual(mockUpdatedDonation);
        });
    });

    // Testes unitários para a remoção de doações pela chave composta
    describe('deleteByKey', () => {
        it('should delete a donation by key', async () => {
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

            mockPrismaService.doacao.delete.mockResolvedValue(mockDeletedDonation);

            const result = await service.deleteByKey(mockKey);

            expect(prisma.doacao.delete).toHaveBeenCalledWith({
                where: {
                nome_campanha_codigo_barras_produto: {
                    nome_campanha: mockKey.campaignName,
                    codigo_barras_produto: mockKey.productBarcode,
                },
                },
            });
            expect(result).toEqual(mockDeletedDonation);
        });
    });
});