import path from 'path'
import multer from 'multer'
import ShortUniqueId from 'short-unique-id'

const { randomUUID } = new ShortUniqueId({ length: 8 })

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve('client', 'static', 'img', 'uploads'))
	},
	filename: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		const fileName = `user-${randomUUID()}${ext}`
		cb(null, fileName)
	},
})

export const upload = multer({ storage: storage })
