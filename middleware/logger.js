// Third party package to date formatting
const moment = require("moment");
// create middleware. @params: req, req, next (next is to point to the next function in the middleware stack)
const logger = (req, res, next) => {
  //log the protocol type and the date of request
  // for date, install a 3rd party package called moment
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    }: ${moment().format()}`
  );
  next();
};

module.exports = logger;
