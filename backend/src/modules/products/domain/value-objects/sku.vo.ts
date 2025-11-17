export class SkuVO {
    constructor(
        public readonly value: string,
    ) {
        if (value.length < 3 || value.length > 255) {
            throw new Error('SKU must be between 3 and 255 characters');
        }
        if (!value.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error('SKU must contain only letters and numbers');
        }
    }
}