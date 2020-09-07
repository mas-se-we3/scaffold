import React, { Component } from 'react'
import './App.css'
import { TodoList } from './TodoList'

class App extends Component {
	state = {
		todos: [],
		users: [],
		error: '',
		posted: false
	}

	async componentDidMount() {
		const response = await fetch('/api/todos')
		this.handleResponse(response, 'todos')
	}

	render() {
		const { todos, users, error, posted } = this.state

		return (
			<div className="app__container">
				<h1>My Todos</h1>
				{error && <h4 role="alert">{error}</h4>}
				<TodoList todos={todos} />
				<button onClick={this.postTodo} disabled={posted}>
					{posted ? 'Posted' : 'Post Dummy Todo'}
				</button>
				<button onClick={this.loadUsers}>Load Users</button>
				{users.map(user => (
					<div key={user.id}>{user.name}</div>
				))}
			</div>
		)
	}

	postTodo = async () => {
		const response = await fetch('/api/todos', {
			method: 'post',
			body: { id: 99, title: 'posting todo' }
		})
		if (response.ok) this.setState({ posted: true })
	}

	loadUsers = async () => {
		const response = await fetch('/api/users')
		this.handleResponse(response, 'users')
	}

	handleResponse = async (response, stateProp) => {
		if (response.ok) {
			const json = await response.json()
			this.setState({ [stateProp]: json })
		} else {
			this.setState({ error: 'Server Error' })
		}
	}
}

export default App
