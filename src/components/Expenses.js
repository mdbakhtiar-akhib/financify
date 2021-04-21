import React, { PureComponent } from 'react';

class Expenses extends PureComponent {

  render() {
    return (
      <div>
          
          <h1>Your Expenses:</h1>
          <p>
                Calculate remaining amount saved, invested vs breakdown
              </p>
      <form id="expenses" onChange={this.props.handleChange}>
      <div className="expense-input">
      <label> Housing $</label>
        <input id="housing" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Investments $</label>
        <input id="investing" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Transportation $</label>
        <input id="transportation" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Savings    $</label>
        <input id="savings" type="number"></input>
          <br></br>
      </div>
      <div className="expense-input">
      <label> Daily Expenses $</label>
        <input id="daily" type="number"></input>
      </div>
      </form>
      </div>
    );
  }

}

export default Expenses;
