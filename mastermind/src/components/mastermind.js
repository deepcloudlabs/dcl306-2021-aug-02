import React from "react";
import GameStatistics from "./statistics";
import CardTitle from "./card_title";
import Badge from "./badge";

export default class Mastermind extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            gameLevel : 3,
            tries: 0,
            secret: this.createSecret(3),
            moves: [],
            guess : 123,
            statistics: {
                wins: 3,
                loses: 5
            }
        }
    }

    createRandomDigit = (min,max) => {
        return Math.floor(Math.random()*(max-min+1))+min;
    }

    createSecret = (level) => {
        let digits = [ this.createRandomDigit(1,9)];
        while (digits.length < level){
            let digit = this.createRandomDigit(0,9);
            if (!digits.includes(digit))
               digits.push(digit);
        }
        return digits.reduce((number,digit) => 10 * number + digit  , 0);
    }

    handleInputGuess = (event) => {
        this.setState({
            "guess": Number(event.target.value)
        })
    }

    play = () => {

    }

    render = () => {
        return(
          <div className="container">
              <div className="card">
                  <div className="card-header">
                    <CardTitle title="Game Console" />
                  </div>
                  <div className="card-body">
                      <Badge label="Game Level" value={this.state.gameLevel} />
                      <Badge label="Tries" value={this.state.tries} />
                      <Badge label="Secret" value={this.state.secret} />
                      <div className="form-group">
                          <label htmlFor="guess">Guess: </label>
                          <input type="number"
                                 id="guess"
                                 value={this.state.guess}
                                 onChange={this.handleInputGuess}
                                 className="form-control"></input>
                      </div>
                      <div className="form-group">
                          <button  onClick={this.play}
                                   className="btn btn-success">Play</button>
                      </div>
                  </div>
              </div>
              <p></p>
              <GameStatistics stats={this.state.statistics} />
          </div>
        );
    }
}