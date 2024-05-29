import { create } from 'express-handlebars'
import { partialsPath } from 'src/utils/path'

export const hbs = create({
	extname: '.hbs',
	defaultLayout: false,
	partialsDir: [partialsPath],
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true,
	},
})
