type Constructor<T> = new (...args: any[]) => T;
type Factory<T> = () => T;

export class Container {
  private singletons = new Map<string, any>();
  private factories = new Map<string, Factory<any>>();

  registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.factories.set(token, factory);    
  }

  resolve<T>(token: string | Constructor<T>): T {
    const key = typeof token === "string" ? token : token.name;

    if (this.singletons.has(key)) {
      return this.singletons.get(key);
    }

    const factory = this.factories.get(key);
    if (!factory) {
      throw new Error(`No registration found for token: ${key}`);
    }

    const instance = factory();
    this.singletons.set(key, instance);
    return instance;
  }
}
