import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    const user = this.configService.get('DB_USER');
    const password = this.configService.get('DB_PASSWORD');
    const host = this.configService.get('DB_HOST');
    const port = this.configService.get('DB_PORT');
    const dbName = this.configService.get('DB_NAME');
    const schema = this.configService.get('DB_SCHEMA');

    return `postgresql://${user}:${password}@${host}:${port}/${dbName}?schema=${schema}`;
  }
}
