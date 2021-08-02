import React from "react";

// class -> stateful component -> Tag: Lottery
class Lottery extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            numbers: [],
            column: 0
        }
        // this.get_lottery_numbers = this.get_lottery_numbers.bind(this);
    }

    draw = () => {
        let lottery_numbers = this.get_lottery_numbers() ;
        let new_numbers= [...this.state.numbers] // cloning the array
        new_numbers.push(lottery_numbers)
        this.setState({ // async!
            numbers: new_numbers
        },() => {
            console.log("callback: "+this.state.numbers)
        })
        console.log("after setState: "+this.state.numbers)
    }

    reset = () => {
        this.setState({ // asynchronous function
            numbers: []
        }, () => {
            console.log("callback: "+this.state.numbers)
        })

    }

    get_lottery_numbers = () => {
        let numbers = []
        while(numbers.length < 6){
            let number = Math.floor(Math.random()*60)+1
            if(!numbers.includes(number))
                numbers.push(number)
        }
        numbers.sort((x,y) => x-y)
        return numbers
    }

    render = () => {
       return (
          <div className="container">
              <div className="card">
                  <div className="card-header">
                      <div className="card-title"><h3>Lottery Application</h3></div>
                  </div>
                  <div className="card-body">
                       <div className="form-group">
                           <label htmlFor="column">Column:</label>
                           <input type="text" id="column" name="column"
                                  className="form-control"></input>
                       </div>
                       <div className="form-group">
                           <button onClick={this.draw}
                               className="btn btn-success">Draw</button>
                           <button onClick={this.reset}
                                   className="btn btn-danger">Reset</button>
                       </div>
                  </div>
              </div>
              <p></p>
              <div className="card">
                  <div className="card-header">
                      <div className="card-title"><h3>Lottery Numbers</h3></div>
                  </div>
                  <div className="card-body">
                      <table className="table table-responsive table-striped table-hover table-bordered">
                          <thead>
                            <tr>
                                {
                                    Array.from(Array(6).keys()).map( i =>
                                        <th key={i}>Column #{i+1}</th>
                                    )
                                }
                            </tr>
                          </thead>
                          <tbody>{
                             this.state.numbers.map( nums =>
                                 <tr>{
                                    nums.map( number =>
                                        <td key={number}>{number}</td>
                                    )
                                 }</tr>
                             )
                          }</tbody>
                      </table>
                  </div>
              </div>
          </div>
       ) ;
    }
}

export default Lottery;