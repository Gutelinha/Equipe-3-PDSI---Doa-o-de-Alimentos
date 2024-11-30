import { BadRequestException, Body, Controller, Delete, Get, Post, Put, Query, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "src/config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "src/config/exception/filter/prisma.exception.filter";
import { DonationService } from "./donation.service";
import { DonationInputDto, DonationKeyInputDto, DonationOutputDto, DonationDeleteOutputDto } from "./dto";
import { DonationMapper } from "./donation.mapper";

@Controller('donations')
@UseFilters(GlobalExceptionFilter, PrismaExceptionFilter)
export class DonationController {
    constructor(
        private readonly donationService: DonationService,
        private readonly donationMapper: DonationMapper
    ) {}

    @Post()
    async createDonation(@Body() input: DonationInputDto): Promise<DonationOutputDto> {
        if(input.key.isIncomplete())
            throw new BadRequestException(input.key.getIncompleteKeyMessage());
        
        const createdDonation = await this.donationService.create(input);
        return this.donationMapper.toOutput(createdDonation);
    }

    @Get()
    async findDonation(@Query() key: DonationKeyInputDto) {
        if(key.isEmpty())
            throw new BadRequestException(`Nenhum dado foi informado`);

        const {productBarcode, campaignName} = key;

        if(productBarcode && campaignName)
            return this.findDonationByKey(key);

        if(productBarcode)
            return this.findAllDonationsForProduct(productBarcode);
    
        if(campaignName)
            return this.findAllDonationsForCampaign(campaignName);
    }

    @Put()
    async updateDonationByKey(@Body() input: DonationInputDto): Promise<DonationOutputDto> {
        if(input.key.isIncomplete())
            throw new BadRequestException(input.key.getIncompleteKeyMessage());

        const updatedDonation = await this.donationService.updateByKey(input);
        return this.donationMapper.toOutput(updatedDonation);
    }

    @Delete()
    async deleteDonationByKey(@Query() key: DonationKeyInputDto): Promise<DonationDeleteOutputDto> {
        if(key.isIncomplete())
            throw new BadRequestException(key.getIncompleteKeyMessage());

        const deletedDonation = await this.donationService.deleteByKey(key);
        return this.donationMapper.toDeleteOutput(deletedDonation, `Doação removida com sucesso`);
    }

    private async findDonationByKey(key: DonationKeyInputDto): Promise<DonationOutputDto> {
        const foundDonation = await this.donationService.findByKey(key);
        return this.donationMapper.toOutput(foundDonation);
    }

    private async findAllDonationsForProduct(productBarcode: string): Promise<DonationOutputDto[]> {
        const donationsByProduct = await this.donationService.findAllByProductBarcode(productBarcode);
        return donationsByProduct.map(donation => this.donationMapper.toOutput(donation));
    }

    private async findAllDonationsForCampaign(campaignName: string): Promise<DonationOutputDto[]> {
        const donationsByCampaign = await this.donationService.findAllByCampaignName(campaignName);
        return donationsByCampaign.map(donation => this.donationMapper.toOutput(donation));
    }

}