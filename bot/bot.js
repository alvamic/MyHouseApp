
$(document).on("submit", "#author-form", bot);

function bot () {
const accountSid = 'AC19de9ea5d1b44971fa1f7b61814f0bf1';
const authToken = '1eb04bc36cfc6cd83d06459ee5f3a50f';
const client = require('twilio')(accountSid, authToken);

client.notify.services('IS748cc39d5a9cb4cb43ce08555d8c3756')
    .bindings
    .create({
        // identity would need to be pulled from a sequel db and changes based off 
        // a who is assigned a task
        identity: 'user1',
        bindingType: 'sms',
        address: '+12405150191'
    })
    .then(binding => console.log(binding.sid))
    .done();

client.notify.services('IS748cc39d5a9cb4cb43ce08555d8c3756')
    .notifications
    .create({
        // body should also be pulled from a database and changes according to how many 
        body: 'Knok-Knok! This is your first Notify SMS',
        // identity would need to be pulled from a sequel db and changes based off 
        // a who is assigned a task
        identity: 'user1'
    })
    .then(notification => console.log(notification.sid))
    .done();
};


