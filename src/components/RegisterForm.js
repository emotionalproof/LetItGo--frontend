import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'

const formReset= {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    passwordConfirmation: "",
}

class RegisterForm extends Component {

    state = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordConfirmation: "",
        newUser: {}
    }

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
            alert("I'm sorry, that username is taken.")
        } else if (this.state.firstName === "Grant" && this.state.lastName.includes("Y")) {
            alert("GRANT YOSHITSU IS NOT ALLOWED IN THIS WEBSITE!!!")
        }else if (this.state.password !== this.state.passwordConfirmation) {
            alert("The Passwords you have provided do not match. Please re-enter.")
        } else if (this.state.firstName === "" || this.state.lastName === "" || this.state.username === "" || this.state.password === "" ) {
            alert("Please fill out all provided fields.")
        }else {
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
                first_name: firstName, 
                last_name: lastName, 
                username: username, 
                password: password, 
                password_confirmation: passwordConfirmation
            })
        })
        .then(resp => resp.json())
        .then(newUser => {
            this.props.handleLogin(newUser)
            this.props.push(`/${this.state.username}`)
            this.setState({formReset})
        })
}

 

    render() {
        // console.log(this.state)
        return (
            <Form className="auth-form" onSubmit={this.handleSubmit}>
                <h1 className="form-title">Register</h1>
                <Form.Group controlId="formBasicFirstName">
                    <Form.Control className="form-input" onChange={this.handleChange} name="firstName" value={this.state.firstName} type="text" placeholder="Enter First Name" />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Control className="form-input" onChange={this.handleChange} name="lastName" value={this.state.lastName} type="text"  placeholder="Enter Last Name" />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control className="form-input" onChange={this.handleChange} name="username" value={this.state.username} type="text" placeholder="Select Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="form-input" onChange={this.handleChange} name="password" value={this.state.password} type="password" placeholder="Enter Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPasswordConfirmation">
                    <Form.Control className="form-input" onChange={this.handleChange} name="passwordConfirmation" value={this.state.passwordConfirmation} type="password" placeholder="Confirm Password" />
                </Form.Group>
                <Button variant="link" type="submit" className='auth-submit-button routine-button'>
                    Submit
                </Button>
            </Form>
        )
    }
}

export default RegisterForm