const noel = () => {
  const today = new Date();
  const christmas = new Date("2022-12-25");
  const res = christmas.getTime() - today.getTime();
  console.log(
    `Cool ! Il reste : ${parseInt(
      res / (1000 * 3600 * 24)
    )} jours avant Noel ! `
  );
};

module.exports = noel;
