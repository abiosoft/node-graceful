# graceful-terminate
Gracefully shutdown your node app. Graceful interrupts `SIGTERM` and `SIGINT` signals.

### Usage
```js
var graceful = require("graceful");
```
Cleanup before exit.
```js
graceful.add(() => console.log("Cleaning up."));
```
```sh
^CCleaning up.
$
```
Prevent shutdown. Return `true` in the function.
```js
graceful.add(() => {
    ... // check some conditions
    if (notReady()){
        console.log("Cannot terminate yet");
        return true; // don't shutdown.
    }
    return false; // shutdown
});
```
```sh
^CCannot terminate yet.
```
You can add multiple functions. Return `true` in any function to prevent shutdown and stop executing other functions.
```js
graceful.add(() => console.log("Cleaning up."));
graceful.add(() => {
    console.log("Shutdown stops here.");
    return true;
}
graceful.add(() => console.log("Won't get here"));
```
```sh
^CCleaning up.
Shutdown stops here.
```

### License
MIT