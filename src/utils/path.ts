import path from 'path'

const modelsPath = path.resolve('src', 'models')
const migrationsPath = path.resolve('src', 'database', 'migrations')
const staticPath = path.resolve('client', 'static')
const viewsPath = path.resolve('client', 'views')
const partialsPath = path.resolve('client', 'views', 'partials')

export { modelsPath, staticPath, viewsPath, partialsPath, migrationsPath }
