import { Expose, Transform } from "class-transformer";
import { formatDateToString } from "../../utils/date-converter";
import { ProductTypeReportModel } from "./product-type-report.model";

export class CampaignReportModel {
    @Expose({ name: 'nome' })
    campaign_name: string;

    @Expose({ name: 'ativa' })
    active_campaign: boolean;

    @Transform(({ value }) => formatDateToString(value))
    @Expose({ name: 'data_inicio' })
    campaign_start_date: string;

    @Transform(({ value }) => formatDateToString(value))
    @Expose({ name: 'data_fim' })
    campaign_end_date: string;

    total_items_donated: number;
    donated_product_types: ProductTypeReportModel[];
}