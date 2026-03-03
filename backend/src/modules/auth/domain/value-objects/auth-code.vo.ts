export class AuthCodeVO {
  readonly #value: string;

  constructor() {
    this.#value = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10).toString(),
    ).join("");
  }

  get value(): string {
    return this.#value;
  }
}
