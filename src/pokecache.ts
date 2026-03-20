interface CacheEntry<T> {
  createdAt: number;
  val: T;
}

export class Cache {
  readonly #cache = new Map<string, CacheEntry<unknown>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  readonly #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add(key: string, val: unknown): void {
    const entry: CacheEntry<unknown> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, entry);
  }

  get(key: string): unknown {
    const entry = this.#cache.get(key);
    return entry?.val;
  }

  #reap(): void {
    for (const [key, entry] of this.#cache) {
      if (entry.createdAt <= Date.now() - this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId !== undefined) {
      clearInterval(this.#reapIntervalId);
      this.#reapIntervalId = undefined;
    }
  }
}
