import { Expose } from "class-transformer";

export class CampaignDeleteOutputDto {
    @Expose({ name: 'nome' })
    resourceId: string;

    message: string;
}