Synchronouz
====

#### Execute it all at the once!

Synchronouz lets you execute several functions (as much as you want, actually!) at the same time, and emits a `done` event when everything finished.


## Installation


To install, just type `npm install synchronouz` in a terminal.  
To then use it, just do `var sync = require("synchronouz");` in your application.


## Usage


### Sync  (function|function[] functions...) : constructor
__functions:__ *function or Array.\<function\>; Rest*. Any amount of functions or Arrays of functions to add.

Sync (or whatever you've called it) is a constructor, to which you can pass the same arguments as to `Sync#add`. You can also call it as normal function.

```javascript
var one = function(cb) {...};
var two = function(cb) {
    cb("Hello, world!");
};
Sync(one, two);
    .exec();
```

> __Note:__ All functions should execute their callback (`cb`), otherwise the final callback will never be executed!


### Sync#arguments (any[] arguments) - .
*Alias: `Sync#args`, `Sync#options`*  
__arguments:__ *Array.\<any\>*. The an array of arguments to apply to the functions.  
__*return:*__ *Sync*. For chaining.

The arguments will be `.apply()`ed to each function, with the callback as last argument. These are default arguments, so if you pass in arguments for `Sync.add`, these will not be used (for that particular function).  
In the example, we pass in an array with one item in it, the string `"Hello, world!"`. So the first argument to each function will be that string:

```javascript
var one = function(message, cb) {
    console.log(message);
    cb();
}
var two = function(message, cb) {
    console.log(message);
    cb();
}

Sync()
    .options(["Hello, world!"]);
    .add(one);
    .add(two, ["hi"]);
    .exec();
    
//Will log:
// Hello, world!
// hi
```


### Sync#args
*Alias for `Sync#arguments`.*


### Sync#options
*Alias for `Sync#arguments`.*


### Sync#add (function|function[] function, [any[] arguments]) - .
__function:__ *function or Array.\<function\>*. A function, or array of functions, to add.  
__arguments:__ *Array.\<any\>; Optional*. An optional array of arguments to apply to the function(s).
__*return:*__ *Sync*. For chaining.

With `Sync.add()`, a function is added to the stack, but instead of using the arguments passed in with `Sync#arguments`, it will use the arguments passed to this method. For example:

```javascript
var one = function(message, cb) {
    console.log("One: " + message);
    cb();
}
var two = function(anotherMessage, cb) {
    console.log("Two: " + anotherMessage);
    cb();
}
Sync(one)
    .options(["A message to One (and all other functions passed to Sync())!"]);
    .add(two, ["But this is a message to Two!"]);
    .exec();
```
    

### Sync#execute  ([function callback]) - .
__callback:__ *function; Optional*. An optional callback for the `Sync#"done"` event.  
__*return:*__ *Sync*. For chaining.

Executes all the functions at once. You can optionally pass in a callback to be bound to the `Sync#"done"` event.

```javascript
var one = function(args, cb) {
    console.log(args);
    cb();
}
var two = function(args, cb) {
    cb();
}
Sync(one, two)
    .options("Hello, world!")
    .exec(function(results) {
        console.log("Done!");
    });
    
//Will log:
// Hello, world!
// Done!
```


### Sync#"done" (arguments[]|Error results)
__results:__ the results of the functions.

When all the functions have run (i.e. all of them have executed their callback), the `done` event is emitted, with one argument: an array of Argument objects that were passed to the callbacks (in the order that the functions were added). One exception to this rule, is when one of the functions returned an Error: then, the `done` event is called immediately, with the Error it returned. The other results are ignored.


```javascript
var one = function(cb) {
    cb();
}
var two = function(cb) {
    cb(new Error("404"));
}
Sync(one, two)
    .on("done", function(result) {
        console.log(result);
    })
    .exec();
```



##LICENSE


**The MIT License (MIT)**

Copyright (c) 2014 Tuur Dutoit

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


[1]: https://npmjs.org/package/frameworkz "Frameworkz"
