// Promise Object vanilla => new Promise()

let debug = true


// Créer une fonction qui retourne une promise
function callPromise(params) {
  return new Promise((res, rej) => {
    if (params) res("Debug mode on")
    else rej("Debug mode off")
  })
}

// function displayMessage(message) {
//   return message
// }


async function main () {

  let result = await callPromise(debug)
  .then(result => result.toUpperCase())
  // .then(returnedResult => console.log(returnedResult))
  .catch((error) => console.log(error))
  .finally(() => console.log("Je passe toujours ici"))
  
  if (result) console.log("OK", result)
  else console.log("Erreur dans la promesse");
}

main()