import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import JournalEntry from './JournalEntry'

const initialState = {
  entries: [],
  date: "",
  content: ""
}

class Remember extends React.Component {
 
  state = initialState

  // componentDidMount() {
  //   fetch(`http://localhost:3002/api/v1/user_activity_logs`)
  //     .then(resp => resp.json())
  //     .then(data => {
  //       this.setState({
  //         entries: data
  //       })
  //     })
  // }
  
  // handleSubmit = e => {
  //   e.preventDefault()
  //   const {date, content} = this.state
  //   fetch(`http://localhost:3002/api/v1/user_activity_logs`, {
  //           method: 'POST',
  //           headers: {
  //               "Content-Type": "application/json",
  //               Accept: "application/json"
  //           },
  //           body: JSON.stringify({
  //              date,
  //              content
  //           })
  //       })
  //       .then(resp => resp.json())
  //       .then(newPost => {
  //           this.setState({
  //             entries: [...this.state.entries, newPost],
  //             initialState
  //           })
  //       })

  // } 

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
 }

  // handleDeleteClick = id => {
  //   console.log(id)
  //   fetch(`http://localhost:3002/api/v1/user_activity_logs/${id}`, {
  //     method: "DELETE"
  //   })
  //   this.setState({
  //     entries: [this.state.entries.filter(entry => entry.id !== id)]
  //   })
  // }
 
 renderUserEntries = () => {
    return this.state.entries.map((entry, index) => <JournalEntry
      key={index}
      entry={entry}
      handleDeleteClick={this.handleDeleteClick}
    />  
    )   
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
        <Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Entry</th>
                <th>Delete Memory?</th>
              </tr>
            </thead>
            <tbody>
            {this.renderUserEntries()}
          </tbody>
        </Table>
        </Container>
    </div>
  )
  }   
}

export default Remember