Synchronouz
====

#### Execute it all at the same time!

Synchronouz lets you execute several function (as much as you want, actually!) at the same time. It was made as a Node.js module for [Frameworkz][1], but it's so dead simple (No more than 50 lines of code!)that it should work in the browser, too.

## Installation


To install, just type `npm install synchronouz` in a terminal.
To then use it, just do `var sync = require("synchronouz");` in your application.


## Usage


### Sync/Synchronous  ( *[functions]* )
*Or whatever you've named it!*
**Sync is just a function, to which you can pass the functions you want to execute** simultaneously. Pass in as many as you want!

```javascript
/* Pass in some functions */
var one = function(args, cb) {...};
var two = function(args, cb) {
    cb("Hello, world!");
};
sync(one, two, function(args, cb) {...});
```

> **Note:** All functions should execute their callback (`cb`), otherwise the final callback will never be executed!

### Sync#options  ( *options* )
**The options to pass to the functions**
The options will be passed to each function, as the first argument. In the example, `args` will be `"Hello, world"`.

```javascript
/* Now, use some options */
var one = function(args, cb) {
    console.log(args);
    cb("Hello, world");
}
var two = function(args, cb) {...}
sync(one, two, function(args, cb){...})
    .options("Hello, world!");
```

### Sync#callback  ( *function(results)* )
### Sync#cb  ( *function(results)* )
**The callback to execute when all functions are done.**
The callback will be executed when all of the functions passed to Sync have executed their callback, so make sure they do so!
The callback will be passed just one callback, `results`. It contains all the results the functions have returned. In the example, you can see how it is structured:

```javascript
/* Demonstrate callbacks */
var one = function(args, cb) {
    console.log(args);
    cb(args, "Bye!");
}
var two = function(args, cb) {
    cb("This is function Two!");
}
sync(one, two, function(args, cb){...})
    .options("Hello, world!")
    .callback(function(results) {
        console.log(results);
    });

//Will output:
[["Hello, world!", "Bye!"], ["This is function Two!"], []]
```

### Sync#execute  ( *function(result)* )
### Sync#exec ( *function(result)* )
**Execute the functions**
You can optionally pass in a callback, wich will only be used if none has been set with `Sync.callback`.

```javascript
/* And execute functions! */
var one = function(args, cb) {
    console.log(args);
    cb(args, "Bye!");
}
var two = function(args, cb) {
    cb("This is function Two!");
}
sync(one, two, function(args, cb){...})
    .options("Hello, world!")
    .callback(function(results) {
        console.log(results);
    })
    .exec(function(results) {
        //Will never be executed
        console.log("This is an alternative callback!");
    });
    
//Will output:
[["Hello, world!", "Bye!"], ["This is function Two!"], []]
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


[1]: http://npmjs.org/package/frameworkz "Frameworkz"
