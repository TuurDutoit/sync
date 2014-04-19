Synchronouz
====

#### Execute it all at the once!

Synchronouz lets you execute several function (as much as you want, actually!) at the same time, and a callback when everything finished. It was made as a Node.js module, but it's so dead simple (No more than 50 lines of code!) that it should work in the browser, too.

## Installation


To install, just type `npm install synchronouz` in a terminal.<br />
To then use it, just do `var sync = require("synchronouz");` in your application.


## Usage


### Sync/Synchronous  ( *function(args, cb) [,function(), ...]* )
*Or whatever you've named it!*<br />
**Sync is just a function, to which you can pass the functions you want to execute**.<br />
Pass in as many as you want!

```javascript
/* Pass in some functions */
var one = function(args, cb) {...};
var two = function(args, cb) {
    cb("Hello, world!");
};
sync(one, two, function(args, cb) {...});
```

> **Note:** All functions should execute their callback (`cb`), otherwise the final callback will never be executed!

### Sync#options   ( *options[]* )
### Sync#arguments ( *options[]* )
### Sync#args      ( *options[]* )
**The an array of arguments to pass to the functions.**<br />
The arguments will be `.apply()`ed to each function, with the callback as last argument. In the example, we pass in an array with one item in it, the string `"Hello, world!"`. So the first argument to each function will be that string:

```javascript
/* Now, use some options */
var one = function(message, cb) {
    console.log(message);
    cb();
}
var two = function(message, cb) {...}
sync(one, two, function(message, cb){...})
    .options(["Hello, world!"]);
    
//Will log:
//"Hello, world!"
```

### Sync#add ( *function(), arguments[]* )
**Add a function with the given arguments**
With `Sync.add()`, a function is added to the stack, but instead of using the arguments passed in with `Sync.options`, it will use the arguments passed to this function. For example:

```javascript
/*Add a function*/
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
    .exec(function(err, result) {...});
```
    

### Sync#callback  ( *function(err, results)* )
### Sync#cb  ( *function(err, results)* )
**The callback to execute when all functions are done.**<br />
The callback will be executed when all of the functions passed to `sync` have executed their callback, so make sure they do so!
Two arguments, `err` and `results`, will be passed to the callback. If one of the functions encountered an error, `err` will contain the object it passed as the firts argument to its callback (normally, an Error object). Otherwise, `err` will be `null` and `result`will contain all the results the functions have returned. In the example, you can see how it is structured:

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
//[["Hello, world!", "Bye!"], ["This is function Two!"], []]
```

### Sync#execute  ( *function(err, result)* )
### Sync#exec ( *function(err, result)* )
**Execute the functions.**<br />
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
//[["Hello, world!", "Bye!"], ["This is function Two!"], []]
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
