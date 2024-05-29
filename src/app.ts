import compression from 'compression'
import flash from 'connect-flash'
import express from 'express'
import session from 'express-session'
import methodOverride from 'method-override'
import { connectDatabase } from './config/database.config'
import { hbs, methodOverrideCallback, sessionConfig } from './config/index'
import { AuthRouter, MainRouter, TrainerRouter, UserRouter } from './routes/index'
import { staticPath, viewsPath } from './utils/path'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(session(sessionConfig))
app.use(flash())
app.use(methodOverride(methodOverrideCallback))
app.use(express.static(staticPath))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use('/', MainRouter)
app.use('/login', AuthRouter)

app.use('/user', UserRouter)
app.use('/trainer', TrainerRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	connectDatabase()
	console.log(`Server is running on http://localhost:${PORT}`)
})
