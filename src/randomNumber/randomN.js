

const randomNumbers = [];

function generateRandomNumbers(n) {
    console.log(n);
    
    for (let i = 0; i < n*9e2 ; i++) {
        randomNumbers.push(
            Math.floor(Math.random() * 1000)
        )
    }
    return randomNumbers;
}

process.on('message', (num) => {
    const numbers = generateRandomNumbers(num);
    process.send(numbers);
})

