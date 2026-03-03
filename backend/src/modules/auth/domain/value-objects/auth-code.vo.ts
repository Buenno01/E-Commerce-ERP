export class AuthCodeVO {
  readonly #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  static generate(): AuthCodeVO {
    const code = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10).toString(),
    ).join("");
    return new AuthCodeVO(code);
  }

  static restore(value: string): AuthCodeVO {
    return new AuthCodeVO(value);
  }

  get value(): string {
    return this.#value;
  }
}
