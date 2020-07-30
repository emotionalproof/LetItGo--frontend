
import React from 'react'
import Container from "react-bootstrap/Container"
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
  
const song = new Audio('https://cdns-preview-9.dzcdn.net/stream/c-929d7f6b124450d4047452b9caee28b2-3.mp3')

class BreatheComponent extends React.Component {

  
  state = {
    timer: 1
  }

  componentDidMount() {
    this.setState({
      timer: 1
    })
    this.song = new Audio
    this.song.src = 'https://cdns-preview-9.dzcdn.net/stream/c-929d7f6b124450d4047452b9caee28b2-3.mp3'

  }

  componentWillUnmount() {
    this.stopClock()
    this.song.pause()

  }
  
  clockTick = () => {
    this.state.timer > 0 &&
    this.setState(prevState => ({
      timer: prevState.timer - 1
    }))
    this.state.timer === 0 && this.checkAlarm()
  }

  checkAlarm =() => {
    this.song.play()
  }

  handleStartClick = () => {
    this.interval = setInterval(this.clockTick, 1000)
  }
  
  stopClock = () => {
    window.clearInterval(this.interval)
  }
  
  render() {
   return(
    <Container className="breathe-container">
        <Row><Col><h1 className="breathe-title">Breathe</h1></Col></Row>
        <Row><Col><h2 className="breathe-title">Close Your Eyes for 30 Seconds and Breathe Deeply</h2></Col></Row>
        <Row><Col><h2>{this.state.timer}</h2></Col></Row>
        <Row>
            <Col><Button className="timer-button" onClick={this.handleStartClick}>Start Timer</Button></Col>
            <Col></Col>
            <Col><Button className="timer-button" onClick={this.stopClock}>Stop Timer</Button></Col>
            <audio className="audio-element">
              <source src="https://cdns-preview-9.dzcdn.net/stream/c-929d7f6b124450d4047452b9caee28b2-3.mp3"></source>
            </audio>
        </Row>
        <Row><Col><h2 className="breathe-title">Press Start Timer When Ready</h2></Col></Row>
    </Container>
   )
  }
}

export default BreatheComponent;


