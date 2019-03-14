import React, { Component } from 'react';

import FdbkContainer from './FdbkContainer';
import Form from './Form';
import Logo from './Logo';
import NavBar from './NavBar';
import Summary from './Summary';
import TopicList from './TopicList';

import './style/App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = this.parseURL();
		window.history.replaceState(this.state, 'fdbk', this.state.url);
		window.onpopstate = (event) => {
			this.setState(event.state);
		};

		this.navigate = this.navigate.bind(this);
	}

	getActiveView() {
		if (this.state.view.hasOwnProperty('form')) {
			return (
				<Form navigate={this.navigate} topic_id={this.state.view.form}/>
			);
		} else if (this.state.view.hasOwnProperty('forms')) {
			return (
				<TopicList listType='form' navigate={this.navigate}/>
			);
		} else if (this.state.view.hasOwnProperty('summary')) {
			return (
				<Summary topic_id={this.state.view.summary}/>
			);
		} else if (this.state.view.hasOwnProperty('summaries')) {
			return (
				<TopicList listType='summary' navigate={this.navigate}/>
			);
		} else if (this.state.view.hasOwnProperty('select_for_comparison')) {
			return (
				// eslint-disable-next-line no-console
				<TopicList listType='select' navigate={this.navigate} select={console.log}/>
			);
		} else {
			return (
				<TopicList navigate={this.navigate}/>
			);
		}
	}

	parseURL(url=document.location.href) {
		var match;
		/* eslint-disable no-cond-assign */
		if (match = url.match(/#\/form\/([^/]*)/)) {
			return {
				'view': {
					'form': match[1]
				},
				'url': match[0]
			};
		} else if (match = url.match(/#\/forms/)) {
			return {
				'view': {
					'forms': null
				},
				'url': match[0]
			};
		} else if (match = url.match(/#\/summary\/([^/]*)/)) {
			return {
				'view': {
					'summary': match[1]
				},
				'url': match[0]
			};
		} else if (match = url.match(/#\/summaries/)) {
			return {
				'view': {
					'summaries': null
				},
				'url': match[0]
			};
		} else if (match = url.match(/#\/select-for-comparison/)) {
			return {
				'view': {
					'select_for_comparison': null
				},
				'url': match[0]
			};
		} else {
			return {
				'view': {
					'topics': null
				},
				'url': '/#/'
			};
		}
		/* eslint-enable no-cond-assign */
	}

	navigate(url) {
		this.setState(this.parseURL(url), ()=>{
			window.history.pushState(this.state, 'fdbk', this.state.url);
		});
	}

	render() {
		const navbar_links = [
			{target: '/#/summaries', text: 'Summaries'},
			{target: '/#/forms', text: 'Forms'},
			{target: '/#/select-for-comparison', text: 'Comparison'},
		];

		return (
			<div className='App'>
				<NavBar links={navbar_links} navigate={this.navigate} title={<Logo/>}/>
				<div className='Center'>
					<FdbkContainer navigate={this.navigate}>
						{this.getActiveView()}
					</FdbkContainer>
				</div>
				<div className='Background'/>
			</div>
		);
	}
}

export default App;
