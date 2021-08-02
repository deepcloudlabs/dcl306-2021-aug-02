class Employee {
    constructor(identity,fullname,salary) {
        this.identity = identity
        this.fullname = fullname
        this.salary = salary
        // this.sayHello = this.sayHello.bind(this)
    }

    sayHello = () => { // lambda expression -> function -> bind(this)
        console.log(`Hello, ${this.fullname}!`)
    }
}

let jack = new Employee("11111111110", "jack bauer", 100000)
jack.sayHello() // context -> this=jack
window.fullname= "kate austen"
setTimeout(jack.sayHello, 3000) // context -> this=window