import React, { Component } from "react";
import "./Calculator.css";
import Btn from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends Component {
  state = { ...initialState };

  clearMemory() {
    this.setState({ ...initialState });
  }
  setNumber(n) {
    //regra para evitar ter dois '.' no display
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });

    // armazenando os numeros no array do state.value dependendo do
    //indicie do current
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(displayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
      console.log(values);
    }
  }
  setOperation(operation) {
    const soma = (n1, n2) => {
      const soma = n1 + n2;
      return soma;
    };
    const subtracao = (n1, n2) => {
      const sub = n1 - n2;
      return sub;
    };
    const divisao = (n1, n2) => {
      const div = n1 / n2;
      return div;
    };
    const multiplicacao = (n1, n2) => {
      const mult = n1 * n2;
      return mult;
    };
    const current = this.state.current;
    if (current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = { ...this.state.values };
      if (currentOperation === "+") {
        values[0] = soma(values[0], values[1]);
        values[1] = 0;
        console.log(values[0])
        console.log(values)
      }
      if (currentOperation === "-") {
        values[0] = subtracao(values[0], values[1]);
        console.log(values[0])
      }
      if (currentOperation === "/") {
        values[0] = divisao(values[0], values[1]);
        console.log(values[0])
      }
      if (currentOperation === "*") {
        values[0] = multiplicacao(values[0], values[1]);
        console.log(values[0])
      }

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values,
      });
    }
  }

  render() {
    const addDigit = (n) => this.setNumber(n);
    const setOperation = (operation) => this.setOperation(operation);
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Btn label="aC" click={() => this.clearMemory()} triple />
        <Btn label="/" click={setOperation} operation />
        <Btn label="7" click={addDigit} />
        <Btn label="8" click={addDigit} />
        <Btn label="9" click={addDigit} />
        <Btn label="*" click={setOperation} operation />
        <Btn label="4" click={addDigit} />
        <Btn label="5" click={addDigit} />
        <Btn label="6" click={addDigit} />
        <Btn label="-" click={setOperation} operation />
        <Btn label="1" click={addDigit} />
        <Btn label="2" click={addDigit} />
        <Btn label="3" click={addDigit} />
        <Btn label="+" click={setOperation} operation />
        <Btn label="0" click={addDigit} double />
        <Btn label="." click={addDigit} />
        <Btn label="=" click={setOperation} operation />
      </div>
    );
  }
}
