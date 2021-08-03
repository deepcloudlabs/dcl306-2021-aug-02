import React from "react";
import GameStatistics from "./statistics";
import CardTitle from "./card_title";

export default class Mastermind extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            gameLevel : 3,
            tries: 0,
            secret: 549,
            moves: [],
            guess : 123,
            statistics: {
                wins: 3,
                loses: 5
            }
        }
    }

    render = () => {
        return(
          <div className="container">
              <div className="card">
                  <div className="card-header">
                    <CardTitle title="Game Console" />
                  </div>
                  <div className="card-body">

                  </div>
              </div>
              <p></p>
              <GameStatistics stats={this.state.statistics} />
          </div>
        );
    }
}