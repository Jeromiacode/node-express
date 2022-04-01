const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

// const getData = () => {
//   const fileName = path.resolve(__dirname, 'data', 'personnage.json');
//   return new Promise((resolve, reject) => {
//     fs.readFile(fileName, (error, data) => {
//       if (error) {
//         reject(error);
//         return;
//       }
//       try {
//         const jsonData = JSON.parse(data);
//         resolve(jsonData);
//       } catch (e) {
//         reject(e);
//       }
//     });
//   });
// };

// const getPersonnages = (data) => {
//   const tab = [];

//   for (let i of data.membre) {
//     let membre1 = i.membre;

//     for (const j of membre1) {
//       let membre2 = j.membre;
//       if (j.nom !== undefined || j.prenom !== undefined) {
//         tab.push(`${j.prenom} - ${j.nom}`);
//       }
//       // BLOC 2
//       if (membre2 !== undefined) {
//         for (const h of membre2) {
//           let membre3 = h.membre;

//           if (h.nom !== undefined || h.prenom !== undefined) {
//             tab.push(`${h.prenom} - ${h.nom}`);
//           }
//           //
//           // BLOC 3
//           if (membre3 !== undefined) {
//             for (const k of membre3) {
//               if (k.nom !== undefined || k.prenom !== undefined) {
//                 tab.push(`${k.prenom} - ${k.nom}`);
//               }
//             }
//           }
//           //
//         }
//       }
//     }
//   }
//   return tab;
// };

// const exo03 = async () => {
//   const data = await getData();
//   const res = getPersonnages(data);
//   console.log(res);
// };
// exo03();

const getDatapromises = path.resolve(__dirname, 'data', 'personnage.json');
const saveData = path.resolve(__dirname, 'data', 'result.json');

fsp.readFile(getDatapromises, { encoding: 'utf-8' }).then((data) => {
  const json = JSON.parse(data);
  const personnages = getPersonnages2(json);
  console.log(personnages);
  // savePersonnages(personnages);
});

const savePersonnages = (personnages) => {
  const data = {
    nbPersonnage: personnages.length,
    personnages,
  };

  const json = JSON.stringify(data, null, 4);
  // const json = JSON.stringify(
  //   data,
  //   (key, value) => {
  //     if (key === 'prenom' && value === 'Riri') {
  //       return null;
  //     } else {
  //       return null;
  //     }
  //   },
  //   4
  // );

  fsp
    .writeFile(saveData, json, { encoding: 'utf8' })
    .then(() => {
      console.log('saved');
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPersonnages2 = (data) => {
  if (data.membre !== undefined) {
    // let personnages = [];
    const personnages = [];

    data.membre.forEach((element) => {
      const internalPersonnages = getPersonnages2(element);
      // personnages = [...personnages, ...internalPersonnages];
      personnages.push(...internalPersonnages);
    });
    return personnages;
  } else {
    return [data];
  }
};
