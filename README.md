# service-locator - A simple service locator for JavaScript.

service-locator helps keep your system decoupled by providing a central
location where your application information can be found by other parts
of you application.

[Service Locator on wikipedia](http://en.wikipedia.org/wiki/Service_locator_pattern)

## Installation

     npm install service-locator

## Usage

Register your functions, objects, string etc using register(). 
Once registered with the service locator there is no way to change it.

```js
var serviceLocator = require('service-locator').createServiceLocator();
var foo = 'bar';
serviceLocator.register('foobar', foo);

console.log(serviceLocator.foobar); // bar

serviceLocator.register(logger, console);

serviceLocator.logger.log('Hello world'); // Hello world
```

## Credits
[Paul Serby](https://github.com/serby/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)