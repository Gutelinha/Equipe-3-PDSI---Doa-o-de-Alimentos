import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { DatabaseConfigModule } from "../config/database/database.config.module";

@Global()
@Module({
    imports: [DatabaseConfigModule], // Importa o módulo de configuração do banco de dados
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}