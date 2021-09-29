import "./App.css";
import React, { Component } from "react";
import Form from "./Form";
import Result from "./Result";

const APIKey = "e07406ea649abfe36f94e084b759d767";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: false,
  };

  changeInputValue = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleCitySubmit = (e) => {
    e.preventDefault();
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${APIKey}`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się!");
      })
      .then((response) => response.json())
      .then((data) => {
        const time = new Date().toLocaleString();
        this.setState((state) => ({
          err: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: state.value,
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState((prevState) => ({
          err: true,
          city: prevState.value,
        }));
      });
  };

  render() {
    return (
      <div className="App">
        <Form
          value={this.state.value}
          change={this.changeInputValue}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
