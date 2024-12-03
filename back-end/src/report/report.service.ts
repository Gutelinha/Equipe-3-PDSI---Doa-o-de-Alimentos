import { Injectable } from "@nestjs/common";
import { produto as ProductModel, campanha as CampaignModel, doacao as DonationModel } from "@prisma/client";
import { ProductService } from "./../product/product.service";
import { CampaignService } from "./../campaign/campaign.service";
import { DonationService } from "./../donation/donation.service";
import { ReportMapper } from "./report.mapper";
import { CampaignReportModel, ProductReportModel, ProductTypeReportModel } from "./model";

@Injectable()
export class ReportService {
    constructor(
        private readonly productService: ProductService,
        private readonly campaignService: CampaignService,
        private readonly donationService: DonationService,
        private readonly reportMapper: ReportMapper
    ) {}

    async generateCampaignReport(campaignName: string): Promise<CampaignReportModel> {
        const campaign: CampaignModel = await this.campaignService.findByName(campaignName);
        const donations: DonationModel[] = await this.donationService.findAllByCampaignName(campaignName);

        console.log(`Generating report for campaign ${campaignName}`)
        let campaignReport = this.reportMapper.toCampaignReportModel(campaign);

        const productTypes: string[] = await this.productService.findAllProductTypes();
        const donatedProducts: ProductModel[] = await this.productService.getDonatedProducts(donations);

        const donatedProductTypes: ProductTypeReportModel[] = productTypes.map(type => {
            const donatedProductsByType = this.getDonatedProductsByType(donatedProducts, type);
            const donatedProductsReport = this.getDonatedProductsReport(donatedProductsByType);
            return new ProductTypeReportModel(type, donatedProductsReport);
        })

        campaignReport.total_items_donated = donatedProductTypes.length;
        campaignReport.donated_product_types = donatedProductTypes;
        return campaignReport;
    }

    private getDonatedProductsByType(products: ProductModel[], type: string): ProductModel[] {
        return products.filter(product => product.tipo === type);
    }

    private getDonatedProductsReport(products: ProductModel[]): ProductReportModel[] {
        // Agrupa os produtos por nome
        const productsGroupedByName = products.reduce((acc, product) => {
            const existing = acc[product.nome];
            if (existing) {
                // Incrementa a quantidade e ajusta o volume total
                existing.quantity += 1;
                existing.total_volume += ` + ${product.unidade_volume}`;
            } else {
                // Cria um novo agrupamento
                acc[product.nome] = {
                    name: product.nome,
                    quantity: 1,
                    total_volume: product.unidade_volume,
                };
            }
            return acc;
        }, {} as Record<string, ProductReportModel>);
    
        // Converte o objeto agrupado para uma lista de ProductReportModel
        return Object.values(productsGroupedByName).map(
            item => new ProductReportModel(item.name, item.quantity, item.total_volume),
        );
    }

}