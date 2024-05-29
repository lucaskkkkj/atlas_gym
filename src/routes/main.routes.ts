import { Router } from 'express'

const route = Router()

route.get('/', (_, response) => {
	return response.render('index')
})

export { route }
