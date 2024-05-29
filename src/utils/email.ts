import nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport'

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		type: 'OAuth2',
		user: process.env.MAIL,
		clientId: process.env.MAIL_CLIENT_ID,
		clientSecret: process.env.MAIL_SECRET,
		refreshToken: process.env.MAIL_REFRESH_TOKEN,
		accessToken: process.env.MAIL_ACCESS_TOKEN,
	},
})

export function sendEmailPassword(
	destination: string,
	clientName: string,
	clientPassword: string,
) {
	let mailOptions: MailOptions = {
		from: process.env.MAIL,
		to: destination,
		subject: 'Seu accesso chegou 💪',
		html: `      
    <h2>Olá ${clientName}</h2>
    <p>
      esse é sua senha provisória no sistema: <strong>${clientPassword}</strong>
      <br>
      <br>
    </p>
    `,
	}

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) console.log(err)
		else console.log(info)
	})
}
