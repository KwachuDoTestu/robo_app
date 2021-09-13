import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';


 // zeby uzywac stanu musze zmienic App z funkcji na obiekt...


class App extends Component  {
	constructor() {
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}

	}
// takie rzeczy nalezy pisac w celu zaladowania jsona i zupdatowaniu state
	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users').then(response => {
			return response.json();
		}).then(users => {
			this.setState({ robots: users });
		})
	}

// zeby this odnosilo sie do App a nie do komponentu na ktorym wystapil event (czyli SearchBox) trzeba uzywac syntaxu = () = > najlepiej uzywac tego do wszystkich swoich funkcji, a te z reacta nie wymagaja strzalkowania
	onSearchChange = (event) => {

		this.setState({ searchfield: event.target.value })

	}


	render() {

		if(!this.state.robots.length) {
			return <h1>Loading...</h1>
		} else {

		const filteredRobots = this.state.robots.filter(robot => {

			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		} )

		return (
		<div className='tc'>
			<h1 className='f1'> RoboFriend </h1>
			<SearchBox searchChange={this.onSearchChange}/>
			<Scroll>
				<ErrorBoundry>
				<CardList robots={filteredRobots} />
				</ErrorBoundry>
			</Scroll>
		</div>
		);
	}
	}
	
}

export default App;