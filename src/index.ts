import app from './app.js'
import { createConnection } from './db.js'

createConnection()

app.listen(app.get('port'))
console.log('Server listening on port 3000')

//agregaste git.ignore