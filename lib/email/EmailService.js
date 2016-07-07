'use strict';

class EmailService {
  constructor(ioc) {
    this.nodemailer = ioc.nodemailer;
    this.htmlToText = ioc.htmlToText;

    this.transporter = this.createTransport(ioc);
    this.senders = this.createSenders(ioc, this.transporter);
  }

  createTransport(ioc) {
    let mailOptions = this.createMailOptions(ioc.config.email),
      transporter = this.nodemailer.createTransport(mailOptions);

    transporter.use('compile', ioc.htmlToText({hideLinkHrefIfSameAsText: true}));
    return transporter;
  }

  createMailOptions(config) {
    return {
      pool: true,
      host: config.host,
      service: config.service || null,
      secure: typeof config.isSecure === 'boolean' && config.isSecure,
      port: this.getPort(config),
      auth: {
        user: config.user,
        pass: config.password
      },
      from: this.getFrom(config),
    };
  }

  getFrom(config) {
    return config.user.indexOf('@') >= 0
      ? `<${config.user}>`
      : `<${config.user}@${config.host}`;
  }

  getPort(config) {
    return config.port || (config.isSecure ? 465 : 25);
  }

  createSenders(ioc, transporter) {
    let senders = {};

    for (var name in ioc.emailTemplates) {
      if (!ioc.emailTemplates.hasOwnProperty(name))
        continue;

      senders[name] = transporter.templateSender(ioc.emailTemplates[name]);
    }

    return senders;
  }

  sendConfirmationEmail(toAddress, token) {
    return this.senders['confirmationEmail'].send(
      {
        to: toAddress
      },
      {
        baseUrl: this.config.email.baseUrl,
        token
      }
    );
  }
}

module.exports = EmailService;
