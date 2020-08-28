const express = require('express')
const path = require('path')

const port = process.env.PORT || 8080
const frontendPath = __dirname + '/../../build/'
const app = express()

app.use(express.static(frontendPath))

app.get('/api/todos', (req, res) => {
	res.send([
		{
			id: 1,
			title: 'Wash clothes'
		},
		{
			id: 2,
			title: 'Vacuum the floor'
		},
		{
			id: 3,
			title: 'Read a good book'
		},
		{
			id: 4,
			title: 'Go to sleep'
		}
	])
})

app.use((req, res) => {
	res.sendFile(path.resolve(frontendPath, 'index.html'))
})

app.listen(port)
console.log('Server started on port ' + port)
