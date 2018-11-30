import React, { Component } from "react";
import "./App.css";

// let time = new Date().toLocaleString();

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleTimeString()
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const radius = canvas.height / 2;
    ctx.translate(radius, radius);
    drawClock();

    function drawClock() {
      drawFace(ctx, radius);
      drawNumbers(ctx, radius);
    }

    function drawFace(ctx, radius) {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();

      const grad = ctx.createRadialGradient(
        0,
        0,
        radius * 0.95,
        0,
        0,
        radius * 1.05
      );
      grad.addColorStop(0, "#333");
      grad.addColorStop(0.5, "white");
      grad.addColorStop(1, "#333");
      // ctx.strokeStyle = grad;
      ctx.lineWidth = radius * 0.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = "#333";
      ctx.fill();
    }

    function drawNumbers(ctx, radius) {
      ctx.font = radius * 0.15 + "px arial";
      ctx.textBaseline = "middle";
      for (let num = 1; num < 13; num++) {
        const ang = (num * Math.PI) / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      time: new Date().toLocaleTimeString()
    });
  }

  render() {
    return (
      <div>
        <canvas className="canvas" ref="canvas" width="400" height="400" />
        <p className="app-clock">The time is {this.state.time}</p>
      </div>
    );
  }
}

export default Clock;
