'use strict';

module.exports = {
  subject: 'Patterflash - Confirm Email Address',
  html: '<h1>Hi!</h1>\
    <p>Someone registered with PatterFlash at this email. If it was \
    you, click the link below to activate your account.</p>\
    <p><a href="{{baseUrl}}/confirm/{{token}}">{{baseUrl}}/confirm/{{token}}</a></p>\
    <p>Thanks,<br>The Patterflash Team</p>'
};
