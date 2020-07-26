import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'

const initialState = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    usernameTaken: false
}

class RegisterForm extends Component {

    state = initialState

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.fetchUser(this.state.username)
    }

    fetchUser = username => {
        fetch(`http://localhost:3002/api/v1/users/login/${username}`).then(resp => resp.json()).then(userData => this.verifyInput(userData))
    }

    verifyInput = fetchResponse => {
        if (!!fetchResponse) {
            alert("I'm sorry, that username is taken")
        } else if (this.state.password !== this.state.passwordConfirmation) {
            alert("The Passwords you have provided do not match. Please re-enter.")
        } else {
            this.createUser()
        }
    }

    createUser = () => {
        const {firstName, lastName, username, password, passwordConfirmation} = this.state
        fetch('http://localhost:3002/api/v1/users/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                firstName, lastName, username, password, passwordConfirmation
            })
        })
        .then(resp => resp.json()).then(newUser => {
            this.setState({initialState})
            this.props.handleLogin()
            this.props.push(`/`)})  //this.props.push(`/${this.state.user.username}`))
    }

 

    render() {
        console.log(this.state)
        return (
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control onChange={this.handleChange} name="firstName" value={this.state.firstName} type="text" placeholder="Enter First Name" />
            </Form.Group>
            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control onChange={this.handleChange} name="lastName" value={this.state.lastName} type="text"  placeholder="Enter Last Name" />
            </Form.Group>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={this.handleChange} name="username" value={this.state.username} type="text" placeholder="Select Username" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control onChange={this.handleChange} name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        )
    }
}

export default RegisterForm