import React from 'react';
import Player from './Player/Player.components';
import Dice from './Dice/Dice.components';
import styles from './Board.module.css';

class Board extends React.Component {
	state = {
		p1Score: 0,
		p2Score: 0,
		p1Temp: 0,
		p2Temp: 0,
		playerTurn: 1,
		winScore: 100,
	};
	OnScoreChange = (sum) => {
		if (this.state.playerTurn === 1) {
			if (sum === 0) {
				this.setState({ p1Temp: 0 }, this.HoldScore);
			} else {
				this.setState({ p1Temp: this.state.p1Temp + sum });
			}
		}
		if (this.state.playerTurn === 2) {
			if (sum === 0) {
				this.setState({ p2Temp: 0 }, this.HoldScore);
			} else {
				this.setState({ p2Temp: this.state.p2Temp + sum });
			}
		}
	};
	checkIfWin = () => {
		console.log(this.state.playerTurn);
		if (this.state.playerTurn === 1) {
			if (this.state.p2Score >= this.state.winScore) {
				console.log('winner');
			}
		} else {
			if (this.state.p1Score >= this.state.winScore) {
				console.log('winner');
			}
		}
	};
	resetGame = () => {
		this.setState((prevState) => {
			return { p1Score: 0, p2Score: 0, p1Temp: 0, p2Temp: 0, playerTurn: 1 };
		});
	};

	HoldScore = () => {
		if (this.state.playerTurn === 1) {
			document.querySelector('#player1').style.backgroundColor =
				'rgb(74, 74, 74)';
			document.querySelector('#player2').style.backgroundColor =
				'rgb(191, 191, 191)';
			this.setState(
				{
					p1Score: this.state.p1Score + this.state.p1Temp,
					playerTurn: 2,
					p1Temp: 0,
				},
				this.checkIfWin,
			);
		}
		if (this.state.playerTurn === 2) {
			document.querySelector('#player2').style.backgroundColor =
				'rgb(74, 74, 74)';
			document.querySelector('#player1').style.backgroundColor =
				'rgb(191, 191, 191)';
			this.setState(
				{
					p2Score: this.state.p2Score + this.state.p2Temp,
					playerTurn: 1,
					p2Temp: 0,
				},
				this.checkIfWin,
			);
		}
	};
	render() {
		const { p1Score, p2Score, p1Temp, p2Temp } = this.state;
		return (
			<div className={styles.board}>
				<Player playerNumber={1} tempScore={p1Temp} globalScore={p1Score} />
				<div className={styles.middle}>
					<Dice onChange={this.OnScoreChange} />
					<button className={styles.holdButton} onClick={this.HoldScore}>
						Hold
					</button>
					<button className={styles.holdButton} onClick={this.resetGame}>
						New Game
					</button>
				</div>
				<Player playerNumber={2} tempScore={p2Temp} globalScore={p2Score} />
			</div>
		);
	}
}
export default Board;
