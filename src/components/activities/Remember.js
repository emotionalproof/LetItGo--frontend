import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const initialState = {
  date: "",
  content: ""
}

class Remember extends React.Component {
 
  state = initialState
  
  handleSubmit = e => {
    e.preventDefault()
    const {date, content} = this.state
    fetch(`http://localhost:3002/api/v1/user_activity_logs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
               date,
               content
            })
        })
        .then(resp => resp.json())
        .then(newPost => {
            // create function to send newPost to wherever state is for displaying journal posts
            // console.log(newPost)
            this.setState({
              initialState
            })
        })

  } 

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
 }
  
  render(){
    // console.log(this.state)
    return(
      <div>
        
        <Container className="journal-container">
          <h1 className="remember-title">Journal</h1>
          <Form onSubmit={event => this.handleSubmit(event)}>
            <Form.Group controlId="formJournal">
              <Form.Label>Enter The Date</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.date} name="date" type="date" placeholder="Today's Date"/>
            </Form.Group>
            <Form.Group controlId="formJournal">
              <Form.Label>Type Your Thoughts</Form.Label>
                <Form.Control onChange={this.handleChange} value={this.state.content} name="content" as="textarea" rows="6" type="text" placeholder="Release Your Thoughts"/>
            </Form.Group>
            <Button variant="primary" type="submit">Submit Entry</Button>
          </Form>
        </Container>
    </div>
  )
  }   
}

export default Remember