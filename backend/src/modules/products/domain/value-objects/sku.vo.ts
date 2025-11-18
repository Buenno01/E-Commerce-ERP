export class SkuVO {
    constructor(
        public readonly value: string,
    ) {
        if (!value.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error('SKU must contain only letters and numbers');
        }
    }
}