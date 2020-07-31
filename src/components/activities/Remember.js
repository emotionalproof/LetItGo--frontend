import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import JournalEntry from './JournalEntry'

const initialState = {
  entries: [],
  date: "",
  content: "",
  userActivity: {},
  activity: {},
  logs: []
}

class Remember extends React.Component {
 
  state = initialState


  componentDidMount() {
    this.setState({userActivity: this.props.userActivity})
    this.fetchUserActivityLogs()
  }

  filterRememberEntries = () => {
    
  }

  fetchUserActivityLogs = () => {
    fetch(`http://localhost:3002/api/v1/activities/${this.props.id}`)
    .then(resp => resp.json())
    .then(logs => {
        console.log(logs)
        logs !== undefined && this.setLog(logs)
        // this.setState({logs: logs})
    })
    
}

  setLog = logData => {
    console.log("before filter",logData)
    let user_activities = logData.user_activities
    let filter_user_activities = user_activities.filter(user_activity => user_activity.user_id === this.state.userActivity.user_id)

    let logs = logData.user_activities.filter(userActivity => userActivity.user_id === this.state.userActivity.user_id)
    console.log("after filter",logs)
    
    logs !== undefined && this.setState({logs: logs})
  }

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
            content,
            user_activity_id: this.state.userActivity.id
        })
    })
    .then(resp => resp.json())
    .then(newPost => {
        console.log(newPost)
        this.props.addLog(newPost)
        this.setState({
          date: "",
          content: ""
        })
    })

  } 

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
 }

  handleDeleteClick = id => {
    console.log(id)
    fetch(`http://localhost:3002/api/v1/user_activity_logs/${id}`, {
      method: "DELETE"
    })
    .then(() => this.props.deleteLog(id))
  }
 
 renderUserEntries = () => {
    return this.props.logs.map((entry, index) => <JournalEntry
      key={index}
      entry={entry}
      id={entry.id}
      handleDeleteClick={this.handleDeleteClick}
    />  
    )   
  }
  
  render(){
    console.log("remember props", this.props)
    console.log("remember state", this.state)
    return(
      <div>
        
        <Container className="journal-container">
          <h1 className="remember-title">Journal</h1>
          <Form className="journal-form" onSubmit={event => this.handleSubmit(event)}>
            <Form.Group className="journal-date-entry" controlId="formJournal">
              <Form.Label >Enter The Date</Form.Label>
                <Form.Control className="journal-form-input" onChange={this.handleChange} value={this.state.date} name="date" type="date" placeholder="Today's Date"/>
            </Form.Group>
            <Form.Group controlId="formJournal">
              <Form.Label>Type Your Thoughts</Form.Label>
                <Form.Control  className="journal-form-input"  onChange={this.handleChange} value={this.state.content} name="content" as="textarea" rows="6" type="text" placeholder="Release Your Thoughts"/>
            </Form.Group>
            <Button variant="link" className="journal-submit routine-button" type="submit">Submit Entry</Button>
          </Form>
        </Container>
        <Container>
          <Table striped bordered hover className="journal-entry-table">
            <thead>
              <tr>
                <th className="journal-table-header-date">Date</th>
                <th>Entry</th>
                <th className="journal-delete">Forget</th>
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