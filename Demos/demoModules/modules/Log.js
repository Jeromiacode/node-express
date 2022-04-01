const log = {
  info: msg => {
    console.log ('[INFO]' + msg);
  },
  warning: msg => {
    console.log ('[WARNING]' + msg);
  },
  error: msg => {
    console.log ('[ERROR]' + msg);
  },
};

module.exports = log;
