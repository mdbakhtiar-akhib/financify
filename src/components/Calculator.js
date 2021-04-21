import React, { Component } from "react";
import Expenses from "./Expenses";

class Calculator extends Component {
  state = {
    income: null,
    annual: 0,
    annualAfterTax: 0,
    tax: 0,
    net: 0,
    balance: 0,
    housingIdeal: 0,
    housingDiff: 0,
    housingInput: 0,
    transportIdeal: 0,
    transportDiff: 0,
    transportInput: 0,
    investingIdeal: 0,
    investingDiff: 0,
    investingInput: 0,
    dailyIdeal: 0,
    dailyDiff: 0,
    dailyInput: 0,
    savingsIdeal: 0,
    savingsDiff: 0,
    savingsInput: 0,
    expenses: [
      { expense: "housing", cost: 0 },
      { expense: "transportation", cost: 0 },
      { expense: "investing", cost: 0 },
      { expense: "daily", cost: 0 },
      { expense: "savings", cost: 0 },
    ],
  };

  taxes = [
    {
      rate: 10,
      bottom: null,
      top: 9950,
    },
    {
      rate: 12,
      bottom: 9951,
      top: 40525,
    },
    {
      rate: 22,
      bottom: 40526,
      top: 86375,
    },
    {
      rate: 24,
      bottom: 86376,
      top: 164925,
    },
    {
      rate: 32,
      bottom: 164926,
      top: 209425,
    },
    {
      rate: 35,
      bottom: 209426,
      top: 523600,
    },
    {
      rate: 37,
      bottom: 523601,
      top: null,
    },
  ];

  // Calculate Annual & Tax Rate
  handleIncome = (e) => {
    let value = null;
    let tax = 0;
    let income = e.target.value * 12;
    if (income < this.taxes[0].top) {
      tax = this.taxes[0].rate;
      value = income - (income * this.taxes[0].rate) / 100;
    } else if (income >= this.taxes[1].bottom && income < this.taxes[1].top) {
      value = income - (income * this.taxes[1].rate) / 100;
      tax = this.taxes[1].rate;
    } else if (income >= this.taxes[2].bottom && income < this.taxes[2].top) {
      value = income - (income * this.taxes[2].rate) / 100;
      tax = this.taxes[2].rate;
    } else if (income >= this.taxes[3].bottom && income < this.taxes[3].top) {
      value = income - (income * this.taxes[3].rate) / 100;
      tax = this.taxes[3].rate;
    } else if (income >= this.taxes[4].bottom && income < this.taxes[4].top) {
      value = income - (income * this.taxes[4].rate) / 100;
      tax = this.taxes[4].rate;
    } else if (income >= this.taxes[5].bottom && income < this.taxes[5].top) {
      value = income - (income * this.taxes[5].rate) / 100;
      tax = this.taxes[5].rate;
    } else if (income > this.taxes[6].bottom) {
      value = income - (income * this.taxes[6].rate) / 100;
      tax = this.taxes[6].rate;
    }
    this.setState({
      income: income,
      annual: income,
      annualAfterTax: income * (1 - tax / 100),
      tax: tax,
      net: (value / 12).toFixed(2),
      balance: (value / 12).toFixed(2),
      housingIdeal: (income / 12) * (1 - tax / 100) * 0.3,
      housingDiff: (income / 12) * (1 - tax / 100) * 0.3,
      transportIdeal: (income / 12) * (1 - tax / 100) * 0.15,
      transportDiff: (income / 12) * (1 - tax / 100) * 0.15,
      investingIdeal: (income / 12) * (1 - tax / 100) * 0.2,
      investingDiff: (income / 12) * (1 - tax / 100) * 0.2,
      dailyIdeal: (income / 12) * (1 - tax / 100) * 0.25,
      dailyDiff: (income / 12) * (1 - tax / 100) * 0.25,
      savingsIdeal: (income / 12) * (1 - tax / 100) * 0.15,
      savingsDiff: (income / 12) * (1 - tax / 100) * 0.15,
    });
  };

  handleChange = (e) => {
    if (this.state.income != null) {
      let index = this.state.expenses.findIndex(
        (x) => x.expense === e.target.id
      );
      if (index === -1) {
        console.log("error");
      } else {
        this.setState({
          expenses: [
            ...this.state.expenses.slice(0, index),
            Object.assign({}, this.state.expenses[index], {
              cost: parseInt(e.target.value),
            }),
            ...this.state.expenses.slice(index + 1),
          ],
        });
      }
      this.renderBalance(e.target.value, e.target.id);
      this.renderIdea(e.target.value, e.target.id);
    } else {
      alert("Please enter an income!");
    }
  };

  renderBalance = (value, id) => {
    let total = 0;
    let remainder = 0;
    const filtered = this.state.expenses.filter((x) => x.expense != id);
    for (var i = 0, _len = filtered.length; i < _len; i++) {
      total += filtered[i].cost;
    }
    //Checks if value is null, then sets it to 0 for easy parsing.
    if (isNaN(parseInt(value))) {
      value = 0;
    }
    //Define Balance variable
    let balance = this.state.net - (parseInt(total) + parseInt(value));

    //Loop to properly define the remainder
    if (isNaN(balance) && total === 0) {
      remainder = 0;
    } else if (isNaN(balance) && total > 0) {
      remainder = total;
    } else {
      remainder = balance;
    }

    this.setState({
      balance: remainder,
    });
  };

  renderIdea = (value, id) => {
    const filtered = this.state.expenses.filter((x) => x.expense != id);
    //console.log(filtered);
    console.log(id + ", " + value);

    if (id == "housing") {
      this.setState({
        housingDiff: this.state.housingIdeal - value,
      });
    } else if (id == "investing") {
      this.setState({
        investingDiff: this.state.investingIdeal - value,
      });
    } else if (id == "transportation") {
      this.setState({
        transportDiff: this.state.transportIdeal - value,
      });
    } else if (id == "daily") {
      this.setState({
        dailyInput: value,
        dailyDiff: this.state.dailyIdeal - value,
      });
    } else if (id == "savings") {
      this.setState({
        savingsInput: value,
        savingsDiff: this.state.savingsIdeal - value,
      });
    }

    /*
    this.setState({
      housingInput: houseInp,
      investingInput: invtInp,
      transportInput: transInp,
      dailyInput: dailyInp,
      savingsInput: savInp,
    });*/
    // Take input of var
    // Subtract Input from Ideal
    // Return var2 = difference
  };

  render() {
    return (
      <div id="calculator">
        <h1>
          {" "}
         
        </h1>
        <form id="income" onChange={this.handleIncome}>
          <label> Gross Monthly Income </label>$
          <input id="income" type="number"></input>
          <br />
          <label> Estimated Tax Rate (2021): </label>
          <label> {this.state.tax}%</label>
        </form>

        <div class="row">
          <div class="column">
            <Expenses handleChange={this.handleChange} />
          </div>
          <div class="column">
            <div>
              <h1>Ideal Breakdown</h1>
              <p>
                Calculate remaining amount saved, invested, age vs breakdown
              </p>
              <div className="expense-input breakdownPad">
                <label>
                  {" "}
                  Housing: $
                  {this.state.housingIdeal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </label>
                <br />
                <br />
                <b>
                  Difference of: ${" "}
                  {this.state.housingDiff
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>

                <br />
              </div>
              <div className="expense-input breakdownPad">
                <label>
                  {" "}
                  Investments: $
                  {this.state.investingIdeal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </label>
                <br />
                <br />
                <b>
                  Difference of: ${" "}
                  {this.state.investingDiff
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>

                <br />
              </div>
              <div className="expense-input breakdownPad">
                <label>
                  {" "}
                  Transportation: $
                  {this.state.transportIdeal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </label>
                <br />
                <br />
                <b>
                  Difference of: ${" "}
                  {this.state.transportDiff
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>

                <br />
              </div>
              <div className="expense-input breakdownPad">
                <label>
                  {" "}
                  Savings: $
                  {this.state.savingsIdeal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </label>
                <br />
                <br />
                <b>
                  Difference of: ${" "}
                  {this.state.savingsDiff
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>
              </div>
              <div className="expense-input breakdownPad">
                <label>
                  {" "}
                  Daily Expenses: $
                  {this.state.dailyIdeal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </label>
                <br></br>
                <br />
                <b>
                  Difference of: ${" "}
                  {this.state.dailyDiff
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                </b>

                <br />
              </div>
            </div>
          </div>
        </div>
        <center>
          <h1>Breakdown</h1>
        </center>
        <div class="row">
          <div class="column">
           <center>
            <label>
              Gross Annual Income: $
              {this.state.annual
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
            <br />
            <label>
              Net Annual Income: $
              {this.state.annualAfterTax
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
            <br />
            <br />
            </center>
          </div>
          <div class="column">
          <center>
            <label>
              {" "}
              Net Monthly Income : ${" "}
              {this.state.net.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
            <br />
            <label>
              {" "}
              Net After Expenses: $
              {this.state.balance
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </label>
            </center>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
