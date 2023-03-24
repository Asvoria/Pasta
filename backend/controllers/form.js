// sendgrid
// import { setApiKey, send } from '@sendgrid/mail'; // SENDGRID_API_KEY
import sendgridPkg from '@sendgrid/mail';
const { setApiKey, send } = sendgridPkg;
setApiKey(process.env.SENDGRID_API_KEY);

export function contactForm(req, res) {
    const { email, name, message } = req.body;
    // console.log(req.body);

    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Email received from contact form:</h4>
            Sender name: ${name}
            Sender email: ${email}
            Sender message: ${message}
            <hr />
            This email may contain sensetive information
            https://pasta.com
        `
    };

    send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
}

export function contactBookAuthorForm(req, res) {
    const { authorEmail, email, name, message } = req.body;
    // console.log(req.body);

    let maillist = [authorEmail, process.env.EMAIL_TO];

    const emailData = {
        to: maillist,
        from: email,
        subject: `Someone messaged you from ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
            <h4>Message received from:</h4>
            name: ${name}
            Email: ${email}
            Message: ${message}
            <hr />
            This email may contain sensetive information
            https://pasta.com
        `
    };

    send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
}
