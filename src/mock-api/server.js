const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { sub } = require('date-fns')

app.use(cors())
app.use(bodyParser.json())

const posts = [
	{
		id: '1',
		title: 'First Post!',
		content: 'Hello!',
		user: '0',
		date: sub(new Date(), { minutes: 10 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
			wow: 0,
			coffee: 0,
		},
	},
	{
		id: '2',
		title: 'Second Post',
		content: 'More text',
		user: '2',
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
			wow: 0,
			coffee: 0,
		},
	},
]

const users = [
	{ id: '0', name: 'Tianna Jenkins' },
	{ id: '1', name: 'Kevin Grant' },
	{ id: '2', name: 'Madison Price' },
]

app.get('/api/posts', (req, res) => {
	console.log('Hello from api/posts')
	setTimeout(() => {
		res.json(posts)
	}, 2000)
})

app.get('/api/users', (req, res) => {
	setTimeout(() => {
		res.json(users)
	}, 1500)
})

app.post('/api/posts', (req, res) => {
	const bug = {
		id: `${Date.now()}`,
		date: sub(new Date(), { minutes: 5 }).toISOString(),
		reactions: {
			thumbsUp: 0,
			hooray: 0,
			heart: 0,
			rocket: 0,
			eyes: 0,
			wow: 0,
			coffee: 0,
		},
		...req.body, // {title, content, user}
	}
	posts.push(bug)

	res.json(bug)
})

app.patch('/api/posts/:id', (req, res) => {
	const index = posts.findIndex(bug => bug.id === parseInt(req.params.id))
	const bug = posts[index]
	if ('resolved' in req.body) bug.resolved = req.body.resolved
	if ('userId' in req.body) bug.userId = req.body.userId

	res.json(bug)
})

app.listen(5000, () => {
	console.log('Mock server started on port 5000..')
})
