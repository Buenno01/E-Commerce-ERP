export class MoneyVO {
    constructor(
        public readonly amount: number,
        public readonly currency: string,
    ) {
        if (amount < 0) {
            throw new Error('Amount must be greater than 0');
        }
        if (currency.length !== 3 || !currency.match(/^[A-Z]{3}$/)) {
            throw new Error('Currency must be a valid currency code');
        }
    }
}