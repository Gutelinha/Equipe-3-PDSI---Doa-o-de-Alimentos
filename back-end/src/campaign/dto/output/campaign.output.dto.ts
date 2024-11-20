import { Expose, Transform } from "class-transformer";
import { formatDateToString } from "../../../utils/date-converter";

export class CampaignOutputDto {
    @Expose({ name: 'nome' })
    name: string;

    @Expose({ name: 'ativa' })
    active: boolean;

    @Transform(({ value }) => formatDateToString(value))
    @Expose({ name: 'data_inicio' })
    start_date: string;

    @Transform(({ value }) => formatDateToString(value))
    @Expose({ name: 'data_fim' })
    end_date: string;
}