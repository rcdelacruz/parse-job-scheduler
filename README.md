# Parse Server Job Scheduler

## Purpose of the library
By default, *_JobSchedule* objects created on self-hosted Parse servers are not handled by the Parse server library.
This library is a minimalist tool that fetches all *_JobSchedule* objects and schedules cron tasks that will run the scheduled jobs.

## How to use it?

### Install the library

```sh
$ npm install --save @brewery/parse-job-scheduler
```

### Add these lines your Parse Cloud Code main file 

```js
// Import the library
const JobsScheduler = require('@brewery/parse-job-scheduler')

// Initialize a Parse instance
JobsScheduler.init({
    serverURL: 'http://localhost:1337/parse',
    appId: 'myAppId',
    masterKey: 'masterKey'
})

// Recreates all crons when the server is launched
JobsScheduler.recreateSchedule()

// Recreates schedule when a job schedule has changed
Parse.Cloud.afterSave('_JobSchedule', async (request) => {
  JobsScheduler.recreateSchedule(request.object)
})

// Destroy schedule for removed job
Parse.Cloud.afterDelete('_JobSchedule', async (request) => {
  JobsScheduler.destroySchedule(request.object)
})
```