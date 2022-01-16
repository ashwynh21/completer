/*
 * completer -
 *
 * the definition of this class mimics the functionality of the completer class that we have defined in the dart
 * packages that lets you deal with unscoped promises instances that can be rejected and resolved in any part of the
 * application so long as you are able to pass the reference to the context properly
 * */

type Resolvable<T> = T | PromiseLike<T>;

export class Completer<T> extends Promise<T> {
    // we have to type assert here
    public complete!: (value: Resolvable<T>) => void;
    public reject!: (reason?: any) => void;

    constructor(options?: { timeout?: number; error?: Error }) {
        super((resolve, reject) => {
            this.complete = resolve;
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
}
