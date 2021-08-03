import React from "react";
import GameStatistics from "./statistics";
import CardTitle from "./card_title";
import Badge from "./badge";
import Move from "../model/move";

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
                wins: 0,
                loses: 0
            }
        }
    }

    componentDidMount() {
        let gameState = localStorage.getItem("mastermind-state")
        if (gameState === null || gameState === undefined){
            let state = {...this.state}
            localStorage.setItem("mastermind-state", JSON.stringify(state))
        } else {
            let game = JSON.parse(gameState)
            this.setState(game);
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

    evaluateMove = (secret,guess) => {
        let secretAsString = secret.toString();
        let guessAsString = guess.toString();
        let perfectMatch = 0;
        let partialMatch = 0;
        for (let i=0;i<secretAsString.length;i++){
            let s = secretAsString.charAt(i);
            for (let j=0;j<guessAsString.length;j++){
                let g = guessAsString.charAt(j);
                if (s===g){
                    if (i===j){
                        perfectMatch++;
                    }  else {
                        partialMatch++;
                    }
                }
            }
        }
        let evalstr = ""
        if (perfectMatch === 0 && partialMatch === 0){
            evalstr = "No match";
        } else {
            if (partialMatch>0)
                evalstr = `-${partialMatch}`;
            if (perfectMatch>0)
                evalstr += `+${perfectMatch}`;
        }
        return {perfectMatch, partialMatch, evalstr}
    }

    play = () => {
        let tries = this.state.tries;
        let moves = [...this.state.moves];
        let gameLevel = this.state.gameLevel;
        let stats = {...this.state.statistics}
        tries++;
        if (this.state.secret === this.state.guess){
            gameLevel++;
            if (gameLevel>10){
                stats.wins++;
                this.setState({
                    tries: 0,
                    moves: [],
                    gameLevel : 3,
                    secret: this.createSecret(3),
                    statistics: stats
                }, () => {
                    let state = {...this.state}
                    localStorage.setItem("mastermind-state", JSON.stringify(state))
                })
                this.props.history.push("/wins");
            } else {
                this.setState({
                    tries: 0,
                    moves: [],
                    gameLevel : gameLevel,
                    secret: this.createSecret(gameLevel)
                }, () => {
                    let state = {...this.state}
                    localStorage.setItem("mastermind-state", JSON.stringify(state))
                })
            }
        } else {
            if (tries > 3){
                stats.loses++;
                this.setState({
                    tries: 0,
                    moves: [],
                    secret: this.createSecret(gameLevel),
                    statistics: stats
                }, () => {
                    let state = {...this.state}
                    localStorage.setItem("mastermind-state", JSON.stringify(state))
                })
                this.props.history.push("/loses");
            } else {
                let evaluation = this.evaluateMove(this.state.secret, this.state.guess);
                moves.push(new Move(this.state.guess, evaluation));
                this.setState({ // async
                    tries: tries,
                    moves: moves
                }, () => {
                    let state = {...this.state}
                    localStorage.setItem("mastermind-state", JSON.stringify(state))
                })
            }
        }
    }
    render = () => {
        let tableMoves = "";
        if (this.state.moves.length > 0){
            tableMoves = <table className="table table-striped table-hover table-responsive table-bordered">
                <thead>
                <tr>
                    <th>Guess</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>{
                    this.state.moves.map( move =>
                        <tr key={move.guess}>
                            <td>{move.guess}</td>
                            <td>{move.evaluation.evalstr}</td>
                        </tr>
                    )
                }</tbody>
            </table>;
        }
        let badgeTries = "";
        if (this.state.tries>0){
            badgeTries = <Badge label="Tries" value={this.state.tries} />
        }
        return(
          <div className="container">
              <div className="card">
                  <div className="card-header">
                    <CardTitle title="Game Console" />
                  </div>
                  <div className="card-body">
                      <Badge label="Game Level" value={this.state.gameLevel} />
                      {badgeTries}
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
                      <p></p>
                      <div className="form-group">
                          {tableMoves}
                      </div>
                  </div>
              </div>
              <p></p>
              <GameStatistics stats={this.state.statistics} />
          </div>
        );
    }
}