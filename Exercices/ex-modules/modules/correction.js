/**
 * Permet d'obtenir la prochaine date de l'event
 * @param {number} date Journé du mois 
 * @param {number} month Valeur du mois (de 1 à 12) 
 * @returns {Date} La prochaine date
 */
 const getNextEventDate = (date, month) => {
  const today = new Date();
  let year = today.getFullYear();

  const indexMonth = month - 1;
  if (today.getMonth() > indexMonth
      || (today.getMonth() === indexMonth && today.getDate() > date)) {
      year++;
  }

  return new Date(year, indexMonth, date);
};

/**
* Permet d'obtenir la difference de journée
* @param {Date} targetDate Date cible
* @param {number} NbDay Nombre de journée calculé
*/
const getDiffDays = (targetDate) => {
  const today = new Date();

  const diff = targetDate.getTime() - today.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil(diff / oneDay);
};


const eventDays = {
  fromChristmas: function () {
      const nextChristmas = getNextEventDate(25, 12);
      const nbDiffDays = getDiffDays(nextChristmas);
      return nbDiffDays;
  },

  fromBirthdate: function (date, month) {
      const nextBirthdate = getNextEventDate(date, month);
      return getDiffDays(nextBirthdate);
  },

  fromHolidays: () => {
      const month = (new Date()).getMonth();

      if (month >= 6 && month <= 7) {
          return 0;
      }

      const nextBeginHolidays = getNextEventDate(1, 7);
      return getDiffDays(nextBeginHolidays);
  },

  //Le prochain solstice d'été (21 Juin) ou d'hiver (21 Decembre)
  fromSolstice: () => {
      const nextSummerSolstice = getNextEventDate(21, 6);
      const nextWinterSolstice = getNextEventDate(21, 12);

      const nbSummerDays = getDiffDays(nextSummerSolstice);
      const nbWinterDays = getDiffDays(nextWinterSolstice);

      return Math.min(nbSummerDays, nbWinterDays);
      // return (nbSummerDays < nbWinterDays) ? nbSummerDays : nbWinterDays;
  },

  fromNextFriday13: () => {
      const today = new Date();

      // Permet d'obtenir le prochain mois où il y un 13e jour
      let indexMonth = today.getMonth();
      if (today.getDate() >= 13) {
          indexMonth++;
      }

      // Recup le prochain 13 du mois
      const nextFriday = new Date(today.getFullYear(), indexMonth, 13);

      // Test si un vendredi -> Si ce n'est pas le cas, on passe au mois suivant
      while (nextFriday.getDay() !== 5) {
          // On passe au mois suivant (→ Gestion de l'année automatique)
          nextFriday.setMonth(nextFriday.getMonth() + 1);
      }

      return getDiffDays(nextFriday);
  }
};

module.exports = eventDays;