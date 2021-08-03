import React from "react";

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
                wins: 0,
                loses: 0
            }
        }
    }

    render = () => {
        return(
          <div className="container">
              Mastermind
          </div>
        );
    }
}