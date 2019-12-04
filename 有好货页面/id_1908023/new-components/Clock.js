import { h, render, Component } from 'preact';

export default class Clock extends Component {
	render() {
		let time = new Date();
		return <time datetime={time.toISOString()}>{ time.toLocaleTimeString() }</time>;
	}
}