import { Injectable, NotFoundException } from "@nestjs/common";
import { ReportMapper } from "./report.mapper";
import { CampaignReportModel, ProductReportModel, ProductTypeReportModel } from "./model";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReportService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly reportMapper: ReportMapper
    ) {}

    async generateCampaignReport(campaignName: string): Promise<CampaignReportModel> {
        console.log(`Generating report for campaign '${campaignName}'`);

        let campaignReport: CampaignReportModel = await this.getCampaignReport(campaignName);
        let donatedProductTypes: ProductTypeReportModel[] = await this.getProductTypeReports(campaignName);

        for(let i=0; i<donatedProductTypes.length; i++) {
            const element = donatedProductTypes.at(i);
            const type = element.type;
            const donatedProducts: ProductReportModel[] = await this.getProductReports(campaignName, type);
            element.donated_products = donatedProducts;
        }

        campaignReport.donated_product_types = donatedProductTypes;
        console.log(`Campaign report generated!`);
        return campaignReport;
    }

    private async getCampaignReport(campaignName: string): Promise<CampaignReportModel> {
        console.log(`Searching for campaign with name '${campaignName}'`);

        const campaignWithDonations = await this.prisma.campanha.findUnique({
            where: { 
                nome: campaignName
            },
            include: {
                doacao: true,
            },
        });
    
        if(!campaignWithDonations) {
            console.log(`Error: Campaign not found`);
            throw new NotFoundException('Campanha não encontrada');
        }
    
        const totalItens = campaignWithDonations.doacao.reduce((sum, doacao) => sum + doacao.quantidade, 0);
        console.log(`Total items donated for this campaign: ${totalItens}`);

        return this.reportMapper.toCampaignReportModel(campaignWithDonations, totalItens);
    }

    private async getProductTypeReports(campaignName: string): Promise<ProductTypeReportModel[]> {
        console.log(`Searching for types of product donated for campaign '${campaignName}'`);
        
        const query_results = await this.prisma.$queryRaw<
            { tipo: string; qtd_itens_doados: number }[]
        >`
            SELECT p.tipo, SUM(d.quantidade) AS qtd_itens_doados
            FROM produto p
            JOIN doacao d
                ON d.codigo_barras_produto = p.codigo_barras
                AND d.nome_campanha = ${campaignName}
            GROUP BY p.tipo;
        `;

        const productTypeReport = query_results.map(row => new ProductTypeReportModel(
            row.tipo,
            row.qtd_itens_doados
        ));

        console.log(`${productTypeReport.length} types of product found`);
        return productTypeReport;
    }

    private async getProductReports(campaignName: string, productType: string): Promise<ProductReportModel[]> {
        console.log(`Searching for products of type '${productType}' donated for campaign '${campaignName}'`);
        
        const query_results = await this.prisma.$queryRaw<
            { nome: string; unidade_volume: string; quantidade: number }[]
        >`
            SELECT p.nome, p.unidade_volume, SUM(d.quantidade) AS quantidade
            FROM produto p
            JOIN doacao d
                ON d.codigo_barras_produto = p.codigo_barras
                AND d.nome_campanha = ${campaignName}
            WHERE p.tipo = ${productType}
            GROUP BY p.nome, p.unidade_volume;
        `;

        const productReport = query_results.map(row => new ProductReportModel(
            row.nome,
            row.unidade_volume,
            row.quantidade
        ));

        console.log(`${productReport.length} different products found`);
        return productReport;
    }

}