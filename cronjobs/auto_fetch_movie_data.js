const cron = require('node-cron');
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
    // writing script to handle database here
    // truncate and call api to update into database
  });
};
