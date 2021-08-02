// asynchronous vs synchronous functions
setTimeout( function(){ // asynchronous
    console.log("Hello Mars!")
} , 3000)
console.log("Hello Jupyter!")
// JS Engine : Execution Thread -> runs -> function