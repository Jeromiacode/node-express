const dayjs = require('dayjs');
const chalk = require('chalk');

// const logger = () => {
//   return (req, res, next) => {
//     const now = dayjs().format('hh:mm:ss');
//     const method = '[' + req.method.toUpperCase() + ']';
//     const url = req.originalUrl;

//     console.log(`${chalk.greenBright(now)} : ${chalk.cyan(method)} ${url}`);
//     next();
//   };
// };

const logger = (req, res, next) => {
    const now = dayjs().format('hh:mm:ss');
    const method = '[' + req.method.toUpperCase() + ']';
    const url = req.originalUrl;

    console.log(`${chalk.greenBright(now)} : ${chalk.cyan(method)} ${url}`);
    next();
};

module.exports = logger;
