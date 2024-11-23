import { Expose, Transform } from "class-transformer";

export class ProductDeleteOutputDto{
    @Expose({ name: 'codigo_barras' })
    resourceId: string;

    message: string;
}