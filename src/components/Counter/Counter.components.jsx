import React from 'react';
import ScoreBox from '../ScoreBox/ScoreBox.components';
class Counter extends React.Component {
	render() {
		const { playerNumber, isTemp } = this.props;
		const counterClass = isTemp
			? `temp-counter-${playerNumber}`
			: `counter-${playerNumber}`;
		const counterText = isTemp ? `Temp Score:` : `Total Score:`;
		return <ScoreBox score={this.props.score} isTempCounter={isTemp} />;
	}
}
export default Counter;
