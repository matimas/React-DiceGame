import React from 'react';
import Player from './Player/Player.components';
import Dice from './Dice/Dice.components';
import styles from './Board.module.css';

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			p1Score: 0,
			p2Score: 0,
			p1Temp: 0,
			p2Temp: 0,
			playerTurn: 1,
			winScore: 100,
			isWinner: false,
		};
		this.player1Ref = React.createRef();
		this.player2Ref = React.createRef();
	}

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
		if (this.state.playerTurn === 1) {
			if (this.state.p2Score >= this.state.winScore) {
				this.setState({ isWinner: true });
				this.resetGame();
				setTimeout(() => {
					this.setState({ isWinner: false });
				}, 2000);
			}
		} else {
			if (this.state.p1Score >= this.state.winScore) {
				this.setState({ isWinner: true });
				this.resetGame();
				setTimeout(() => {
					this.setState({ isWinner: false });
				}, 2000);
			}
		}
	};
	resetGame = () => {
		this.setState((prevState) => {
			return {
				p1Score: 0,
				p2Score: 0,
				p1Temp: 0,
				p2Temp: 0,
				playerTurn: prevState.playerTurn,
			};
		});
	};

	ChangeWinScore = (e) => {
		let winScoreNum = parseInt(e.target.value);
		if (!winScoreNum) {
			return;
		}
		this.setState((prevState) => {
			return { winScore: e.target.value };
		});
	};
	HoldScore = () => {
		if (this.state.playerTurn === 1) {
			this.player1Ref.current.style.backgroundColor = 'rgb(74, 74, 74)';
			this.player2Ref.current.style.backgroundColor = 'rgb(191, 191, 191)';
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
			this.player2Ref.current.style.backgroundColor = 'rgb(74, 74, 74)';
			this.player1Ref.current.style.backgroundColor = 'rgb(191, 191, 191)';
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
			<div className={styles.boardContainer}>
				{this.state.isWinner && <div className={styles.winnerMessage}></div>}
				<Player
					ref={this.player1Ref}
					playerNumber={1}
					tempScore={p1Temp}
					globalScore={p1Score}
				/>
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
				<Player
					ref={this.player2Ref}
					playerNumber={2}
					tempScore={p2Temp}
					globalScore={p2Score}
				/>
			</div>
		);
	}
}
export default Board;
