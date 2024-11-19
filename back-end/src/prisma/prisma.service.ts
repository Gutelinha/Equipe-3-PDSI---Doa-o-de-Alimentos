import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { DatabaseConfigService } from "../config/database/database.config.service";

@Injectable()
export class PrismaService extends PrismaClient {

    constructor(databaseConfigService: DatabaseConfigService) {
        super({
            datasources: {
                db: {
                    url: databaseConfigService.databaseUrl
                }
            }
        })
    }

}