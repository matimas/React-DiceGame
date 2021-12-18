import React from 'react';
import './ScoreBox.css';
const ScoreBox = ({ score, isTempCounter }) => {
	let bc = isTempCounter ? 'temp' : '';
	return (
		<div className={`box ${bc}`}>
			<p>{score}</p>
		</div>
	);
};
export default ScoreBox;
