// 1. Promise
// 2. async -> syntactic sugar -> Promise

function get_lottery_numbers(){ // sync
    // 1-60, 6 , random, sorted, distinct
    let numbers = []
    while(numbers.length < 6){
        let number = Math.floor(Math.random()*60)+1
        if(!numbers.includes(number))
            numbers.push(number)
    }
    numbers.sort((x,y) => x-y)
    return numbers
}

// console.log(get_lottery_numbers())

function async_get_lottery_numbers(){ // async
    return new Promise( (resolve,reject) =>{
        let numbers = []
        while(numbers.length < 6){
            let number = Math.floor(Math.random()*60)+1
            if(!numbers.includes(number))
                numbers.push(number)
        }
        numbers.sort((x,y) => x-y)
        resolve(numbers)
    })

}
console.log("before async_get_lottery_numbers")
async_get_lottery_numbers().then( nums => console.log("async_get_lottery_numbers():"+nums) ) // callback function
console.log("after async_get_lottery_numbers")

async function async_get_lottery_numbers2(){ // sync
    // 1-60, 6 , random, sorted, distinct
    let numbers = []
    while(numbers.length < 6){
        let number = Math.floor(Math.random()*60)+1
        if(!numbers.includes(number))
            numbers.push(number)
    }
    numbers.sort((x,y) => x-y)
    return numbers
}

console.log("before async_get_lottery_numbers2")
async_get_lottery_numbers2().then( nums => console.log("async_get_lottery_numbers2():"+nums) ) // callback function
console.log("after async_get_lottery_numbers2")