import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'

const initialState = {username: "", password: "", userCheck: false, passwordCheck: false, user: {}}

class LoginForm extends Component {

    state = initialState

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })         
    }

    handleSubmit = e => {
        e.preventDefault()
        const {username, password} = this.state
        this.fetchUser(username)
        
    }

    fetchUser = username => {
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json()).then(userData => this.setState({user: userData}))
        .then(() => this.checkUsername())
    }

    checkUsername = (prop) => {
        if (this.state.user.username !== this.state.username){
            alert("Username Not Found")
        } else if (this.state.user.password !== this.state.password){
            alert("Password Does Not Match Records")
        } else {
            this.setState({initialState})
            this.props.handleLogin()
            this.props.push(`/`)  //this.props.push(`/${this.state.user.username}`)
        }
    }

    render() {
    //   console.log(this.props)
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={this.handleChange} name="username" type="text" placeholder="Enter Username" value={this.state.username}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
