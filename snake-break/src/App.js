import { Component } from "react";
import Snake from "./components/Snake";
import Food from "./components/Food";
import Menu from "./components/Menu";
import Controller from "./components/Controller";
import "./index.css";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 49;
  let x = Math.floor(Math.random() * (max - min + 1) + min) * 2;
  let y = Math.floor(Math.random() * (max - min + 1) + min) * 2;
  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  direction: "RIGHT",
  route: "menu",
  snakeDots: [
    [0, 0],
    [0, 2],
  ],
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    this.gameInterval = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.gameInterval);
  }

  componentDidUpdate() {
    this.onSnakeOutOfBounds();
    this.onSnakeCollapsed();
    this.onSnakeEat();
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = [...dots[dots.length - 1]];
    switch (this.state.direction) {
      case "RIGHT":
        head[0] += 2;
        break;
      case "LEFT":
        head[0] -= 2;
        break;
      case "DOWN":
        head[1] += 2;
        break;
      case "UP":
        head[1] -= 2;
        break;
      default:
        break;
    }
    dots.push(head);
    if (this.state.food[0] === head[0] && this.state.food[1] === head[1]) {
      this.enlargeSnake();
      this.increaseSpeed();
      this.setState({ food: getRandomCoordinates() });
    } else {
      dots.shift();
    }
    this.setState({ snakeDots: dots });
  };

  onSnakeOutOfBounds() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }

  onSnakeCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    });
  }

  onSnakeEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.enlargeSnake();
      this.increaseSpeed();
      this.setState({
        food: getRandomCoordinates(),
      });
    }
  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
      clearInterval(this.gameInterval);
      this.gameInterval = setInterval(this.moveSnake, this.state.speed);
    }
  }

  onRouteChange = () => {
    this.setState({ route: "game" });
  };

  gameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length - 2}`);
    this.setState(initialState);
  }

  onDown = () => {
    this.setState({
      direction: "DOWN",
    });
  };

  onUp = () => {
    this.setState({
      direction: "UP",
    });
  };

  onRight = () => {
    this.setState({
      direction: "RIGHT",
    });
  };

  onLeft = () => {
    this.setState({
      direction: "LEFT",
    });
  };

  render() {
    const { route, snakeDots, food } = this.state;
    return (
      <div>
        {route === "menu" ? (
          <div>
            <Menu onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <div className="game-area">
              <Snake snakeDots={snakeDots} />
              <Food dot={food} />
            </div>
            <Controller
              onDown={this.onDown}
              onUp={this.onUp}
              onRight={this.onRight}
              onLeft={this.onLeft}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
