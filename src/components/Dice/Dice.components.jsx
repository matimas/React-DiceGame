import React from 'react';
import './Dice.styles.css';
class Dice extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dice1: 0, dice2: 0, diceSum: 0, isSix: false };
		this.dice1REf = React.createRef();
		this.dice2REf = React.createRef();
		this.dicesRef = React.createRef();
	}

	rotateDices = () => {
		this.dicesRef.current.className = 'dices-shaking';
		setTimeout(() => {
			this.dicesRef.current.className = 'dices';
		}, 1000);
	};

	RollDice = () => {
		this.rotateDices();
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
		this.dice1REf.current.className = `number${this.state.dice1}`;
		this.dice2REf.current.className = `number${this.state.dice2}`;
		this.props.onChange(this.state.diceSum);
	};
	DoubleSix = () => {
		if (this.state.isSix) {
			return <div className={'six-message'}></div>;
		} else {
			return null;
		}
	};
	render() {
		return (
			<div className='dice-container'>
				{this.DoubleSix()}
				<div ref={this.dicesRef} className='dices' id='dices'>
					<div ref={this.dice1REf} className='dice1' id='dice1'></div>
					<div ref={this.dice2REf} className='dice2' id='dice2'></div>
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
