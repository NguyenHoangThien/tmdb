const cron = require('node-cron');
const scriptRunning = require('./scripts_fetch');

module.exports = function () {
  /*
  CronJob Scheduler Description
  ┌────────────── second (optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  │ │ │ │ │ │
  │ │ │ │ │ │
 # * * * * * *
  * */
  // running at 12PM everyday
  cron.schedule('0 0 0 * * *', async () => {
    scriptRunning();
    // writing script to handle database here
    // truncate and call api to update into database
  });
};
