
import React from 'react'
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button'
  


class Breathe extends React.Component {

  
  state = {
    timer: 0
  }

  componentDidMount() {
    this.setState({
      timer: 0
    })
  }

  clockTick = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1
    }))
  }

  handleStartClick = () => {
    this.interval = setInterval(this.clockTick, 1000)
  }
  
  stopClock = () => {
    clearInterval(this.interval)
  }
  
  render() {
   return(
    <div className="breathe-container" >
      <h1 className="breathe-title">Breathe</h1>
      <h2 className="breathe-title">Close Your Eyes for 30 Seconds and Breathe Deeply</h2>
      <Container>
        <h2>{this.state.timer}</h2>
        <Button onClick={this.handleStartClick}>Start Timer</Button>
        <Button onClick={this.stopClock}>Stop Timer</Button>
        <h2 className="breathe-title">Press Start Timer When Ready</h2>
      </Container>
    </div>
   )
  }
}

export default Breathe;


