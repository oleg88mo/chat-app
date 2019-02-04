import React from "react";
import {Link} from "react-router-dom";
import firebase from "../../firebase";
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false
    };

    displayErrors = errors => errors.map((err, i) => <p key={i}>{err.message}</p>);

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    handleSubmit = e => {
        e.preventDefault();

        if (this.isFormValid(this.state)) {
            this.setState({errors: [], loading: true});

            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(signedInUser => {
                console.log("signedInUser", signedInUser);
                this.setState({loading: false});
            }).catch(err => {
                console.log("err", err);
                this.setState({errors: this.state.errors.concat(err), loading: false});
            });
        }
    };

    isFormValid = ({email, password}) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    };

    render() {
        const {email, password, errors, loading} = this.state;

        return (
            <Grid
                textAlign="center"
                verticalAlign="middle"
                className="app"
                onSubmit={this.handleSubmit}
            >
                <Grid.Column style={{maxWidth: 450}}>
                    <Header
                        as="h1"
                        icon
                        color="violet"
                        textAlign="center"
                    >
                        <Icon name="code branch" color="violet"/> Login to DevChat
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="email"
                                value={email}
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email Address"
                                type="email"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, "email")}
                            />
                            <Form.Input
                                fluid
                                name="password"
                                value={password}
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                type="password"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, "password")}
                            />
                            <Button
                                disabled={loading}
                                className={loading ? "loading" : ""}
                                fluid
                                color="violet"
                                size="large"
                            >Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;