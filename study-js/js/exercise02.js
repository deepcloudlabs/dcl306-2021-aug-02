numbers = [4, 8, 15, 16, 23, 42]

// even -> squared -> sum
let sum = 0
for (let index in numbers) {
    let number = numbers[index]
    if (number % 2 == 0) {
        let squared = number * number
        sum = sum + squared
    }
}
console.log(sum) // 2100

// functional: filter/map/reduce (ES6)
let even = n => n%2 == 0
let squared = x => x*x
let accumulate = (s,u) => s+u
sum = numbers.filter(even)
             .map( squared )
             .reduce( accumulate , 0 )
console.log(sum) // 2100
