export class SlugVO {
    constructor(
        public readonly value: string,
    ) {
        if (value.length < 3 || value.length > 255) {
            throw new Error('Slug must be between 3 and 255 characters');
        }
        if (!value.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)) {
            throw new Error('Slug must be in lowercase and contain only letters and numbers and hyphens');
        }
    }
}