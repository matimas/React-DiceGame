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
		isWinner: false,
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
			setTimeout(() => {
				if (this.state.p2Score >= this.state.winScore) {
					console.log('winner');
					this.resetGame();
				}
			}, 5000);
		} else {
			setTimeout(() => {
				if (this.state.p1Score >= this.state.winScore) {
					console.log('winner');
					this.resetGame();
				}
			}, 5000);
		}
	};
	resetGame = () => {
		this.setState((prevState) => {
			return { p1Score: 0, p2Score: 0, p1Temp: 0, p2Temp: 0, playerTurn: 1 };
		});
	};

	ChangeWinScore = (e) => {
		let winScoreNum = parseInt(e.target.value);
		console.log(winScoreNum);
		if (!winScoreNum) {
			console.log(winScoreNum);
			return;
		}
		this.setState((prevState) => {
			return { winScore: e.target.value };
		});
		console.log('in the changeScore', e.target.value);
		console.log(this.state);
	};
	HoldScore = () => {
		console.log(this.state.winScore);
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
					<input
						className={styles.winScoreInput}
						placeholder='FINAL SCORE'
						type='text'
						min='20'
						max='1000'
						onChange={this.ChangeWinScore}
					/>
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
