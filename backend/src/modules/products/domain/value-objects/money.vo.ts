export class MoneyVO {
  constructor(
    public readonly amount: number,
    public readonly currencyCode: string,
  ) {
    if (amount < 0) {
      throw new Error("Amount must be greater than or equal to 0");
    }
    if (currencyCode.length !== 3 || !currencyCode.match(/^[A-Z]{3}$/)) {
      throw new Error("Currency must be a valid currency code");
    }
  }
}
