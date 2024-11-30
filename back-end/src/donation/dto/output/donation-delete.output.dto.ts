import { DonationKeyOutputDto } from "./donation-key-output.dto";

export class DonationDeleteOutputDto {
    resourceId: DonationKeyOutputDto;
    message: string;

    constructor(resourceId: DonationKeyOutputDto, message: string) {
        this.resourceId = resourceId;
        this.message = message;
    }
}