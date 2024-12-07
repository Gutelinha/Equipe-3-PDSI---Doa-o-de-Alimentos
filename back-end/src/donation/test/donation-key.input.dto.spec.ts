import { DonationKeyInputDto } from '../dto/input/donation-key.input.dto';

describe('DonationKeyInputDto', () => {
    describe('isEmpty', () => {
        it('deve retornar true quando nenhum campo está preenchido', () => {
            const dto = new DonationKeyInputDto();
            expect(dto.isEmpty()).toBe(true);
        });

        it('deve retornar false quando pelo menos um campo está preenchido', () => {
            let dto = new DonationKeyInputDto();
            dto.productBarcode = '123456789';
            expect(dto.isEmpty()).toBe(false);

            dto = new DonationKeyInputDto(); // Resetar
            dto.campaignName = 'Campanha Teste';
            expect(dto.isEmpty()).toBe(false);
        });
    });

    describe('isIncomplete', () => {
        it('deve retornar true quando apenas um campo está preenchido', () => {
            let dto = new DonationKeyInputDto();
            dto.productBarcode = '123456789';
            expect(dto.isIncomplete()).toBe(true);

            dto = new DonationKeyInputDto(); // Resetar
            dto.campaignName = 'Campanha Teste';
            expect(dto.isIncomplete()).toBe(true);
        });

        it('deve retornar false quando ambos os campos estão preenchidos', () => {
            const dto = new DonationKeyInputDto();
            dto.productBarcode = '123456789';
            dto.campaignName = 'Campanha Teste';
            expect(dto.isIncomplete()).toBe(false);
        });

        it('deve retornar true quando nenhum campo está preenchido', () => {
            const dto = new DonationKeyInputDto();
            expect(dto.isIncomplete()).toBe(true);
        });
    });

    describe('getIncompleteKeyMessage', () => {
        it('deve retornar a mensagem esperada', () => {
            const dto = new DonationKeyInputDto();
            const expectedMessage = 'Tanto o código do produto quanto o nome da campanha devem ser informados';
            expect(dto.getIncompleteKeyMessage()).toBe(expectedMessage);
        });
    });
});
