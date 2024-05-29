import 'express-session'
declare module 'express-session' {
	interface SessionData {
		activeUser?: string
		error?: string
	}
}
