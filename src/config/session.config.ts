import { SessionOptions } from 'express-session'

export const sessionConfig: SessionOptions = {
	secret: process.env.SESSION_SECRET!,
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: false,
		maxAge: 30 * 24 * 60 * 60 * 1000,
	},
}
