/*
    1. Object-Oriented Programming -> Class/Object
    2. Functional Programming -> Function -> Pure Function/High-Order Function -> Lambda Expression
 */
circle1 = { // object-based
    x: 0,
    y: 1,
    radius: 100,
    area: function () { // synchronous -> blocking function
        return Math.PI * this.radius * this.radius;
    }
}

console.table(circle1)
console.log(circle1.x)
console.log(circle1.area())

let Circle = function (x, y, radius) { // defines a Class
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.area = function () {
        return Math.PI * this.radius * this.radius;
    }
}

circle2 = new Circle(0,1,100) // object
circle3 = new Circle(0,1,200) // object
console.log(circle2.area())
console.log(circle3.area())

class Cember { // ES6: class definition -> syntactic sugar -> function
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }

}

circle4 = new Cember(0,1,200) // object
console.log(circle4.area())
