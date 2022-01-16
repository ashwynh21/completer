import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Completer } from '../index';

describe('Completer', () => {
    it('should resolve after 1.5 seconds', () => {
        const completer = new Completer();

        setTimeout(() => completer.complete(), 1.5e3);

        return completer.then((value) => {
            return expect(value).to.be.undefined;
        });
    });

    it('should reject after 1 second', () => {
        const completer = new Completer();

        setTimeout(() => completer.reject(), 1e3);

        return completer
            .then(() => {
                throw Error('Should Reject');
            })
            .catch(() => {
                /* expected to reject */
            });
    });
});
