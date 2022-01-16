# Completer

A simple class that allows you to de-contextualize promises just like in ```dart```

## How to install

```npm install @ashwynh21/completer```

It also has ```TS``` support.

## How to use

The ```Completer``` class can be used on both ```Browser``` and ```NodeJS``` since it
is based on ```Promise``` instances. All it does is wrap a promise instance along with
a few other things that allow you to access the control properties of the promise instance
outside. i.e. ```resolve``` and ```reject```.

Here is a set of use cases:

### Browser

<hr/>

Let's say you want to run an ```HTTP``` request to some ```API``` that will
trigger a loader and provide some data so that you can add
that data to an event listener on some button.

Now, when the user clicks on this button you want to resolve
some initially running feature (loader). so that the loader
only stops when the response comes back and, the user clicks on
the button.

```typescript
// import the completer class
import { Completer } from '@ashwynh21/completer';

// in comes the completer
const button = document.querySelector('button');
// we define a completer instance
const completer = new Completer();
// then get the loader
const loader = document.querySelector('#loader');

const api_call = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, Mat.floor(Math.random() * 1E4));
    })
};

// before calling the api request we start the loader
loader.start();
// then we tell the completer promise what to do when complete
completer.promise.then(() => loader.stop());

api_call().then(() => button.addEventListener('click', () => {
    // then we resolve the completer, triggering the then callback to stop the loader
    completer.resolve()
}));
```

### NodeJS

<hr/>

let's say you have a series of ```API``` hooks, for instance, a payment set. Say a user triggers
a payment flow on their ```UI``` and you ```API``` triggers a request to your payment provider.
Your provider will then hook the results of the payment back on another function that you have
defined.

So let us say you wanted to complete the users request, when the provider hooks back in on the
second function you would have defined.

```typescript
// import the completer class
import { Completer } from '@ashwynh21/completer';

const transactions: Record<string, Completer> = {};

// your initial payment hook
const payment = (id: string) => {
    // make payment request to provider
    transactions[id] = new Completer();
  
    // so by returning the completers promise, the response will only resolve once the completer is completed
    return transactions[id].promise;
}

// the provider hook
const result = (data: { id: string }) => {
    // so then here we complete the users requests since the payment has been confirmed
    return transactions[data.id].resolve(data);
}
```

<hr/>

I hope this tiny class does the same wonders that it has done for me.

## Class Properties and Methods

### Constructor

The class constructor takes an `options` object that allows you to set custom
features, i.e.:


| Name      | Description                                                                            |
| ----------- | ---------------------------------------------------------------------------------------- |
| `timeout` | Allows you to set a timeout limit on the completer                                     |
| `error`   | Allows you to apply a custom error to be thrown if the completer comes across an error |

### Properties


| Name      | Description                                                   |
| ----------- | --------------------------------------------------------------- |
| `promise` | The reference to the promise that is wrapped by the completer |

### Methods


| Name      | Description                                  |
| ----------- | ---------------------------------------------- |
| `resolve` | Called when resolving the completer promise. |
| `reject`  | Called when rejecting the completer promise. |

## Contributions

<hr/>

This is an open source project, and its pretty simple. Please feel free to make PRs considering any
ideas that would make this class more sensible and well fleshed out.
