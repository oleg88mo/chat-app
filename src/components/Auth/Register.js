import React from "react";
import {Link} from "react-router-dom";
import firebase from "../../firebase";
import md5 from "md5";
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";

class Register extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = {message: "Fill in all fields"};
            this.setState({errors: errors.concat(error)});
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = {message: "Password is invalid"};
            this.setState({errors: errors.concat(error)});
            return false;
        } else {
            // form valid
            return true;
        }
    };

    isFormEmpty = ({username, email, password, passwordConfirmation}) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length;
    };

    isPasswordValid = ({password, passwordConfirmation}) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        } else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    };

    displayErrors = errors => errors.map((err, i) => <p key={i}>{err.message}</p>);

    handleChange = e => this.setState({[e.target.name]: e.target.value});

    handleSubmit = e => {
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({errors: [], loading: true});
            firebase
                .auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(createdUser => {
                console.log("createdUser", createdUser);
                createdUser.user.updateProfile({
                    displayName: this.state.username,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                }).then(() => {
                    this.saveUser(createdUser).then(() => {
                        console.log("User saved");
                        this.setState({loading: false});
                    });
                }).catch(err => {
                    console.error("err", err);
                    this.setState({errors: this.state.errors.concat(err), loading: false});
                });
            }).catch(err => {
                console.error("err", err);
                this.setState({errors: this.state.errors.concat(err), loading: false});
            });
        }
    };

    saveUser = createdUser => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL,
        });
    };

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    };

    render() {
        const {username, email, password, passwordConfirmation, errors, loading} = this.state;

        return (
            <Grid
                textAlign="center"
                verticalAlign="middle"
                className="app"
                onSubmit={this.handleSubmit}
            >
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange"/> Register for DevChat
                    </Header>
                    <Form size="large">
                        <Segment stacked>
                            <Form.Input
                                fluid
                                name="username"
                                value={username}
                                icon="user"
                                iconPosition="left"
                                placeholder="Username"
                                type="text"
                                onChange={this.handleChange}
                            />
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
                            <Form.Input
                                fluid
                                name="passwordConfirmation"
                                value={passwordConfirmation}
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                type="password"
                                onChange={this.handleChange}
                                className={this.handleInputError(errors, "password")}
                            />
                            <Button
                                disabled={loading}
                                className={loading ? "loading" : ""}
                                fluid
                                color="orange"
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
                    <Message>Already a user? <Link to="/login">Login</Link></Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;