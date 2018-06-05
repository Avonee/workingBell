import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isCounting: false,
      secondsElapsed: 0,
      minutesElapsed: 0,
      mileStone: 0
    };

    this.startClick = this.startClick.bind(this);
  }

  startClick() {
    this.setState(prevState => ({ isCounting: !prevState.isCounting }));

    if (this.state.isCounting === false) {
      this.interval = setInterval(() => this.tick(), 1000);
    } else {
      clearInterval(this.interval)
    }
  }

  tick() {

    // 每60秒就進位成1分鐘
    if (this.state.secondsElapsed === 59) {
      this.setState(({
        secondsElapsed: 0,
        minutesElapsed: this.state.minutesElapsed + 1
      }));

    } else {
      this.setState((prevState) => ({
        secondsElapsed: prevState.secondsElapsed + 1
      }));
    }

    // 每25分鐘就＋1顆
    if (this.state.minutesElapsed === 25) {
      this.setState(({
        minutesElapsed: 0,
        mileStone: this.state.mileStone + 1
      }));
    }

  }



  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // showTime() {
  //   return
  // }

  render() {
    return (

      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">{this.state.minutesElapsed < 10 ? '0' + this.state.minutesElapsed : this.state.minutesElapsed}:{this.state.secondsElapsed < 10 ? "0" + this.state.secondsElapsed : this.state.secondsElapsed}</h1>
        <button className="Count-Button" onClick={this.startClick}>{this.state.isCounting ? "stop" : "start"}</button>
        <h3 style={{ fontWeight: 10, marginTop: "60px" }}>今日要總計 {this.state.mileStone} 顆</h3>
      </div>

    );
  }
}

export default App;
