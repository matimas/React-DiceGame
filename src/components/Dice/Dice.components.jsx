import React from 'react';
import './Dice.styles.css';
class Dice extends React.Component {
	state = { dice1: 0, dice2: 0, diceSum: 0, isSix: false };
	RollDice = () => {
		const dice1 = Math.floor(Math.random() * 6) + 1;
		const dice2 = Math.floor(Math.random() * 6) + 1;
		if (dice1 === 6 && dice2 === 6) {
			setTimeout(() => {
				this.setState(
					{ dice1: dice1, dice2: dice2, diceSum: 0, isSix: true },
					this.AssignResDice,
				);
			}, 1000);
			setTimeout(() => {
				this.setState({ isSix: false });
			}, 2000);
		} else {
			this.setState(
				{ dice1: dice1, dice2: dice2, diceSum: dice1 + dice2 },
				this.AssignResDice,
			);
		}
	};
	AssignResDice = () => {
		document.querySelector('#dice1').className = `number${this.state.dice1}`;
		document.querySelector('#dice2').className = `number${this.state.dice2}`;
		this.props.onChange(this.state.diceSum);
	};
	render() {
		return (
			<div className='dice-container'>
				{this.state.isSix && <div className='six-message'></div>}
				<div className='dices'>
					<div className='dice1' id='dice1'></div>
					<div className='dice2' id='dice2'></div>
				</div>
				<button
					className='ThrowDiceButtton'
					type='button'
					onClick={this.RollDice}
				>
					Throw
				</button>
			</div>
		);
	}
}
export default Dice;
