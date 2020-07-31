import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button'

const formReset = {username: "", password: "", userCheck: false, passwordCheck: false,}

class LoginForm extends Component {

    state = {username: "", password: "", userCheck: false, passwordCheck: false, user: {}}

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })         
    }

    handleSubmit = e => {
        e.preventDefault()
        const {username} = this.state
        this.fetchUser(username)
        
    }

    fetchUser = username => {
        fetch(`http://localhost:3002/api/v1/users/login/${username}`)
            .then(resp => resp.json())
            .then(userData => {
                this.setState({user: userData})
                this.checkUsername()
            })
    }

    checkUsername = () => {
        if (!this.state.user){
            alert("Username Not Found")
        } else if (this.state.user.password !== this.state.password){
            alert("Password Does Not Match Records")
        } else {
            this.setState({formReset})
            this.props.handleLogin(this.state.user)
            this.props.push(`/${this.state.user.username}`)
        }
    }

    render() {
    //   console.log(this.props)
        return (
            <Form className="auth-form" onSubmit={this.handleSubmit}>
                <h1 className="form-title">Login</h1>
                <Form.Group controlId="formBasicUsername">
                    <Form.Control className="form-input" onChange={this.handleChange} name="username" type="text" placeholder="Enter Username" value={this.state.username}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="form-input" onChange={this.handleChange} name="password" type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button variant="link" type="submit" className="auth-submit-button routine-button">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default LoginForm;
