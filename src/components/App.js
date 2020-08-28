import React, { Component } from 'react'
import './App.css'
import { TodoList } from './TodoList'

class App extends Component {
	state = {
		todos: []
	}

	async componentDidMount() {
		const response = await fetch('/api/todos')
		const todos = await response.json()
		this.setState({ todos })
	}

	render() {
		return (
			<div class="app__container">
				<h1>My Todos</h1>
				<TodoList todos={this.state.todos} />
			</div>
		)
	}
}

export default App
