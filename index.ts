/*
 * completer -
 *
 * the definition of this class mimics the functionality of the completer class that we have defined in the dart
 * packages that lets you deal with unscoped promises instances that can be rejected and resolved in any part of the
 * application so long as you are able to pass the reference to the context properly
 * */

type Resolvable<T> = T | PromiseLike<T>;

export class Completer<T> implements Promise<T> {
    private promise: Promise<T>;

    constructor(options?: { timeout?: number; error?: Error }) {
        this.promise = new Promise<T>((resolve, reject) => {
            this.complete = (value?: Resolvable<T>) => resolve(value as Resolvable<T>);
            this.reject = reject;

            if (options) {
                if (options.timeout) {
                    setTimeout(() => {
                        if (options.error) {
                            return this.reject(options.error);
                        }

                        return this.reject(new Error('Completer timeout error'));
                    }, options.timeout);
                }
            }
        });
    }

    // we have to type assert here
    public complete!: (value?: Resolvable<T>) => void;
    public reject!: (reason?: any) => void;

    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null,
    ): Promise<TResult1 | TResult2> {
        return this.promise.then(onfulfilled, onrejected);
    }
    catch<TResult = never>(
        onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null,
    ): Promise<T | TResult> {
        return this.promise.catch(onrejected);
    }
    finally(onfinally?: (() => void) | null): Promise<T> {
        return this.promise.finally(onfinally);
    }
    [Symbol.toStringTag]!: string;
}
