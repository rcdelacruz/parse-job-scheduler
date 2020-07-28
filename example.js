const jobs = require('./index')
const Parse = require('parse/node')

jobs.init({
    serverURL: 'http://localhost:1337/parse',
    appId: 'myAppId',
    masterKey: 'masterKey'
})
// Recreates all crons when the server is launched
jobs.recreateSchedule()

// Recreates schedule when a job schedule has changed
Parse.Cloud.afterSave('_JobSchedule', async (request) => {
    await JobsScheduler.recreateSchedule(request.object)
})

// Destroy schedule for removed job
Parse.Cloud.afterDelete('_JobSchedule', async (request) => {
    JobsScheduler.destroySchedule(request.object)
    JobsScheduler.recreateSchedule()
})
