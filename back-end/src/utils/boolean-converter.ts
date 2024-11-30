import { BadRequestException } from "@nestjs/common";

export function convertStringToBoolean(value: string): boolean {
    const booleanValues = ['true', 'false'];

    if(booleanValues.includes(value.toLowerCase()))
        return value.toLowerCase() === 'true';

    throw new BadRequestException(`Somente os valores 'true' e 'false' são válidos`);
}