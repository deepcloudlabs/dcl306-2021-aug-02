import React from "react";

// class -> stateful component -> Tag: Lottery
class Lottery extends React.PureComponent {
    constructor(props,context) {
        super(props,context);
        this.state = {
            numbers: [],
            column: 0
        }
    }

    render(){
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
                           <button className="btn btn-success">Draw</button>
                           <button className="btn btn-danger">Reset</button>
                       </div>
                  </div>

              </div>
          </div>
       ) ;
    }
}

export default Lottery;