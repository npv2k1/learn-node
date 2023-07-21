function log() {
    console.log("first(): factory evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("first(): called");
    };
}
@
function main() {
    console.log("Hello World");
}
main();
