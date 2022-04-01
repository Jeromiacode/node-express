// console.log(process.env);

let age

process.stdin.on('readable', () => {
  age = process.stdin.read()
})

console.log(age);