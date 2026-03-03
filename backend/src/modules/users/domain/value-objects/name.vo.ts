export class NameVO {
  readonly #value: string;

  constructor(name: string) {
    if (!name || name.split("").every((c) => c == " ")) {
      throw new Error("Name is required");
    }

    const trimmed = name.trim();

    if (trimmed.length < 3) {
      throw new Error(`Name must have at least 3 characters: "${name}"`);
    }

    this.#value = trimmed;
  }

  get value(): string {
    return this.#value;
  }
}
