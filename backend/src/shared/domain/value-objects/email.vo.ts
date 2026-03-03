export class EmailVO {
  readonly #value: string;

  constructor(email: string) {
    if (!email) {
      throw new Error("Email is required");
    }

    const normalized = this.normalize(email);

    if (!EmailVO.isValid(normalized)) {
      throw new Error(`Invalid email: "${email}"`);
    }

    this.#value = normalized;
  }

  get value(): string {
    return this.#value;
  }

  static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  equals(other: EmailVO | string): boolean {
    if (other instanceof EmailVO) {
      return this.#value === other.value;
    }

    return this.#value === this.normalize(other);
  }

  private normalize(str: string) {
    return str.trim().toLowerCase();
  }
}
