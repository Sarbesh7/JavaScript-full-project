
const y = setInterval(() => {

let date = new Date();
let b= date.toLocaleTimeString();
console.log(b);

document.getElementById("time-section").innerHTML=b;


}, 1000);

