"use strict";
const button = document.querySelector('button');
function add(n1, n2, s1) {
    console.log(s1);
    return n1 + n2;
}
function clickHandler(message) {
    console.log("clicked!2 qw--->", message);
}
if (button) {
    button.addEventListener('click', clickHandler.bind(null, 'sdal;'));
}
//# sourceMappingURL=app1.js.map