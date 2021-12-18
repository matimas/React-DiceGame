import styles from './Player.module.css';
import React from 'react';
import Counter from '../Counter/Counter.components';

const Player = (props) => {
	const { globalScore, tempScore, playerNumber } = props;
	return (
		<div
			id={`player${playerNumber}`}
			className={(`player-${playerNumber}`, styles.player)}
		>
			<h2>PLAYER {playerNumber}</h2>
			<Counter playerNumber={playerNumber} isTemp={false} score={globalScore} />
			<Counter playerNumber={playerNumber} isTemp={true} score={tempScore} />
		</div>
	);
};
export default Player;
