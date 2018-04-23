import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap';

import AuthService from '../../../modules/Auth/Auth';

class Register extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.Auth = new AuthService();
    this.state = {
      username: "",
      email: "",
      password: "",
      repeatPassword: ""
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      name="repeatPassword"
                      onChange={this.handleChange}
                    />
                  </InputGroup>
                  <Button color="success" block onClick={this.handleRegister}>Create Account </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
      }
    )
  }

  handleRegister(e) {
    e.preventDefault();
    console.log(this.state);

    if (this.state.password === this.state.repeatPassword) {
      this.Auth.register(this.state.username,this.state.password)
        .then(res =>{
          this.props.history.replace('/');
        })
        .catch(err =>{
          alert(err);
        })
    } else {
      alert("Passwords do not match")
    }
  }
}

export default Register;
