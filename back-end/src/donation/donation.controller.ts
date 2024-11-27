import { Body, Controller, Get, Post, Put, UseFilters } from "@nestjs/common";
import { GlobalExceptionFilter } from "src/config/exception/filter/global.exception.filter";
import { PrismaExceptionFilter } from "src/config/exception/filter/prisma.exception.filter";
import { DonationService } from "./donation.service";
import { DonationInputDto, DonationKeyInputDto, DonationOutputDto } from "./dto";
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
        const createdDonation = await this.donationService.createDonation(input);
        return this.donationMapper.toOutput(createdDonation);
    }

    @Get()
    async findDonationByKey(@Body() key: DonationKeyInputDto): Promise<DonationOutputDto> {
        const foundDonation = await this.donationService.findDonationByKey(key);
        return this.donationMapper.toOutput(foundDonation);
    }

    @Put()
    async updateDonationByKey(@Body() input: DonationInputDto): Promise<DonationOutputDto> {
        const updatedDonation = await this.donationService.updateDonationByKey(input);
        return this.donationMapper.toOutput(updatedDonation);
    }

}