import * as React from "react";
import * as ReactDOM from "react-dom";

class CalculatorStep extends React.Component {
  render() {
    return (
        <button className="btn btn-secondary" type="button" id={this.props.stepId} onClick={() => { this.props.handleClick(this.props.step)}}>{this.props.step}</button>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [0]
    };
    
    this.handleClear = this.handleClear.bind(this);
    this.handleNumStep = this.handleNumStep.bind(this);
    this.handleOperatorStep = this.handleOperatorStep.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }
  
  handleClear() {
    this.setState({
      steps: [0]
    })
  }
  
  handleNumStep(number) {
    let newSteps = this.state.steps.slice();
    if(newSteps.length % 2 == 1) {
      let numRef = newSteps.pop();
      newSteps.push(numRef == '0' ? number.toString() : numRef.toString()+number.toString()); 
    }
    else {
      newSteps.push(number.toString());
    }
    this.setState({
      steps: newSteps
    })
  }
  
  handleOperatorStep(operator) {
    let newSteps = this.state.steps.slice();
    if(newSteps.length % 2 == 0) {
      if(operator != "-")
        newSteps.pop();
    } else if (newSteps[newSteps.length - 1] == '-') {
      newSteps.pop();
      newSteps.pop();
    }
    newSteps.push(operator); 
    this.setState({
      steps: newSteps
    })
  }
  
  handleDecimal() {
    let newSteps = this.state.steps.slice();
    console.log(newSteps);
    if(newSteps.length % 2 == 0) {
      newSteps.push(0);
    } 
    if(newSteps[newSteps.length - 1].indexOf('.') < 0)
      newSteps[newSteps.length - 1] = newSteps[newSteps.length - 1]+'.';
    this.setState({
      steps: newSteps
    })
  }

  handleResult() {
    let stepsList = this.state.steps.slice();
    let indexOfOperator;
    let maxFixed = 0;

    while((indexOfOperator = stepsList.indexOf('/')) > 0) {
      stepsList.splice(indexOfOperator - 1, 3, Number(stepsList[indexOfOperator - 1]) / Number(stepsList[indexOfOperator + 1]));
    }
    while((indexOfOperator = stepsList.indexOf('x')) > 0) {
      stepsList.splice(indexOfOperator - 1, 3, Number(stepsList[indexOfOperator - 1]) * Number(stepsList[indexOfOperator + 1]));
    }
    while((indexOfOperator = stepsList.indexOf('-')) > 0) {
      stepsList.splice(indexOfOperator - 1, 3, Number(stepsList[indexOfOperator - 1]) - Number(stepsList[indexOfOperator + 1]));
    }
    while((indexOfOperator = stepsList.indexOf('+')) > 0) {
      stepsList.splice(indexOfOperator - 1, 3, Number(stepsList[indexOfOperator - 1]) + Number(stepsList[indexOfOperator + 1]));
    }
    this.setState({
      steps: stepsList,
    })
  } 
  
  render () {
    return (
      <div id="calculator">
        <input type="text" id="display" readonly value={this.state.steps.join(' ')}/>
        <CalculatorStep stepId="seven" step={7} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="eight" step={8} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="nine" step={9} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="divide" step={'/'} handleClick={this.handleOperatorStep}/>
        <CalculatorStep stepId="four" step={4} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="five" step={5} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="six" step={6} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="multiply" step={'x'} handleClick={this.handleOperatorStep}/>
        <CalculatorStep stepId="one" step={1} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="two" step={2} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="three" step={3} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="subtract" step={'-'} handleClick={this.handleOperatorStep}/>
        <CalculatorStep stepId="clear" step={'clear'} handleClick={this.handleClear}/>
        <CalculatorStep stepId="zero" step={0} handleClick={this.handleNumStep}/>
        <CalculatorStep stepId="decimal" step={'.'} handleClick={this.handleDecimal}/>
        <CalculatorStep stepId="add" step={'+'} handleClick={this.handleOperatorStep}/>
        <CalculatorStep stepId="equals" step={'='} handleClick={this.handleResult}/>
      </div>
    )
  }
}

class AppWrapper extends React.Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center text-muted text-uppercase">My Calculator</h1>
            <Calculator />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<AppWrapper />, document.getElementById('root'));