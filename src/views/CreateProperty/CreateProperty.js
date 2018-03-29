import React, { Component } from 'react';
import axios from 'axios'

import {
  Col,
  Button,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
} from 'reactstrap';

import Auth from '../../modules/Auth/Auth'

let initialState = {
  owner: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: ""
  },
  address: {
    street_address: "",
    city: "",
    state: "",
    zip_code:""
  }
};

class CreateProperty extends Component {
  constructor(props) {
    super(props);
    this.initialState = initialState = {
      owner: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      address: {
        street_address: "",
        city: "",
        state: "",
        zip_code:""
      }
    };
    this.Auth = new Auth();
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
    this.updateAddress = this.updateAddress.bind(this);
    this.state = this.initialState
  }

  componentWillMount() {}

  render() {
    console.log(this.state);
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>New Property</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Owner First Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Text"
                    onChange={(e) => this.updateOwner(e)}
                    value={this.state.owner.first_name}
                  />
                  <FormText color="muted">For example: "Jerry"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Owner Last Name</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Text"
                    onChange={(e) => this.updateOwner(e)}
                    value={this.state.owner.last_name}
                  />
                  <FormText color="muted">For example: "Rice"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Phone Number</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="Text"
                    onChange={(e) => this.updateOwner(e)}
                    value={this.state.owner.phone_number}
                  />
                  <FormText color="muted">For example: "720-343-3212"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Email</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Text"
                    onChange={(e) => this.updateOwner(e)}
                    value={this.state.owner.email}
                  />
                  <FormText color="muted">For example: "jerryrice@gmail.com"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Street Address</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="street_address"
                    name="street_address"
                    placeholder="Text"
                    onChange={(e) => this.updateAddress(e)}
                    value={this.state.address.street_address}
                  />
                  <FormText color="muted">For example "123 N West St"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">City</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Text"
                    onChange={(e) => this.updateAddress(e)}
                    value={this.state.address.city}
                  />
                  <FormText color="muted">For example "Aspen"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">State</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="state"
                    name="state"
                    placeholder="Text"
                    onChange={(e) => this.updateAddress(e)}
                    value={this.state.address.state}
                  />
                  <FormText color="muted">For example: "CA"</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Zip Code</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    id="zip_code"
                    name="zip_code"
                    placeholder="Text"
                    onChange={(e) => this.updateAddress(e)}
                    value={this.state.address.zip_code}
                  />
                  <FormText color="muted">For example: "80222"</FormText>
                </Col>
              </FormGroup>
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="email-input">Email Input</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="email" id="email-input" name="email-input" placeholder="Enter Email"/>*/}
                  {/*<FormText className="help-block">Please enter your email</FormText>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="password-input">Password</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="password" id="password-input" name="password-input" placeholder="Password"/>*/}
                  {/*<FormText className="help-block">Please enter a complex password</FormText>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="disabled-input">Disabled Input</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="text" id="disabled-input" name="disabled-input" placeholder="Disabled" disabled/>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="textarea-input">Textarea</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="textarea" name="textarea-input" id="textarea-input" rows="9"*/}
                         {/*placeholder="Content..."/>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="select">Select</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="select" name="select" id="select">*/}
                    {/*<option value="0">Please select</option>*/}
                    {/*<option value="1">Option #1</option>*/}
                    {/*<option value="2">Option #2</option>*/}
                    {/*<option value="3">Option #3</option>*/}
                  {/*</Input>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="selectLg">Select Large</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9" size="lg">*/}
                  {/*<Input type="select" name="selectLg" id="selectLg" bsSize="lg">*/}
                    {/*<option value="0">Please select</option>*/}
                    {/*<option value="1">Option #1</option>*/}
                    {/*<option value="2">Option #2</option>*/}
                    {/*<option value="3">Option #3</option>*/}
                  {/*</Input>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="selectSm">Select Small</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="select" name="selectSm" id="SelectLm" bsSize="sm">*/}
                    {/*<option value="0">Please select</option>*/}
                    {/*<option value="1">Option #1</option>*/}
                    {/*<option value="2">Option #2</option>*/}
                    {/*<option value="3">Option #3</option>*/}
                    {/*<option value="4">Option #4</option>*/}
                    {/*<option value="5">Option #5</option>*/}
                  {/*</Input>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="disabledSelect">Disabled Select</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="select" name="disabledSelect" id="disabledSelect" disabled>*/}
                    {/*<option value="0">Please select</option>*/}
                    {/*<option value="1">Option #1</option>*/}
                    {/*<option value="2">Option #2</option>*/}
                    {/*<option value="3">Option #3</option>*/}
                  {/*</Input>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="multiple-select">Multiple select</Label>*/}
                {/*</Col>*/}
                {/*<Col md="9">*/}
                  {/*<Input type="select" name="multiple-select" id="multiple-select" multiple>*/}
                    {/*<option value="1">Option #1</option>*/}
                    {/*<option value="2">Option #2</option>*/}
                    {/*<option value="3">Option #3</option>*/}
                    {/*<option value="4">Option #4</option>*/}
                    {/*<option value="5">Option #5</option>*/}
                    {/*<option value="6">Option #6</option>*/}
                    {/*<option value="7">Option #7</option>*/}
                    {/*<option value="8">Option #8</option>*/}
                    {/*<option value="9">Option #9</option>*/}
                    {/*<option value="10">Option #10</option>*/}
                  {/*</Input>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label>Radios</Label>*/}
                {/*</Col>*/}
                {/*<Col md="9">*/}
                  {/*<FormGroup check className="radio">*/}
                    {/*<Input className="form-check-input" type="radio" id="radio1" name="radios" value="option1"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="radio1">Option 1</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check className="radio">*/}
                    {/*<Input className="form-check-input" type="radio" id="radio2" name="radios" value="option2"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="radio2">Option 2</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check className="radio">*/}
                    {/*<Input className="form-check-input" type="radio" id="radio3" name="radios" value="option3"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="radio3">Option 3</Label>*/}
                  {/*</FormGroup>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label>Inline Radios</Label>*/}
                {/*</Col>*/}
                {/*<Col md="9">*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-radio1">One</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-radio2">Two</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-radio3">Three</Label>*/}
                  {/*</FormGroup>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3"><Label>Checkboxes</Label></Col>*/}
                {/*<Col md="9">*/}
                  {/*<FormGroup check className="checkbox">*/}
                    {/*<Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="checkbox1">Option 1</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check className="checkbox">*/}
                    {/*<Input className="form-check-input" type="checkbox" id="checkbox2" name="checkbox2" value="option2"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="checkbox2">Option 2</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check className="checkbox">*/}
                    {/*<Input className="form-check-input" type="checkbox" id="checkbox3" name="checkbox3" value="option3"/>*/}
                    {/*<Label check className="form-check-label" htmlFor="checkbox3">Option 3</Label>*/}
                  {/*</FormGroup>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label>Inline Checkboxes</Label>*/}
                {/*</Col>*/}
                {/*<Col md="9">*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>*/}
                  {/*</FormGroup>*/}
                  {/*<FormGroup check inline>*/}
                    {/*<Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3"/>*/}
                    {/*<Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>*/}
                  {/*</FormGroup>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="file-input">File input</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="file" id="file-input" name="file-input"/>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row>*/}
                {/*<Col md="3">*/}
                  {/*<Label htmlFor="file-multiple-input">Multiple File input</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Input type="file" id="file-multiple-input" name="file-multiple-input" multiple/>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
              {/*<FormGroup row hidden>*/}
                {/*<Col md="3">*/}
                  {/*<Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>*/}
                {/*</Col>*/}
                {/*<Col xs="12" md="9">*/}
                  {/*<Label className="custom-file">*/}
                    {/*<Input className="custom-file" type="file" id="custom-file-input" name="file-input"/>*/}
                    {/*<span className="custom-file-control"></span>*/}
                  {/*</Label>*/}
                {/*</Col>*/}
              {/*</FormGroup>*/}
            </Form>
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary" onClick={() => this.submitForm()}>
              <i className="fa fa-dot-circle-o"></i>
              Submit
            </Button>
            <Button type="reset" size="sm" color="danger" onClick={() => this.resetForm()}>
              <i className="fa fa-ban"></i>
              Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  resetForm() {
    this.setState({
      owner: {
        first_name: "",
        last_name: "",
        phone_number: "",
        email: ""
      },
      address: {
        street_address: "",
        city: "",
        state: "",
        zip_code:""
      }
    });
  }

  submitForm() {
    let headers = {
      'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let config = {
      headers
    };

    if (this.Auth.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.Auth.getToken()
    }

    axios.post('http://localhost:7001/restricted/properties', this.state, config)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.props.history.replace('/500');
  }

  updateOwner(e) {
    let owner = this.state.owner;
    owner[e.target.id] = e.target.value;
    this.setState({
      owner
    });
  }

  updateAddress(e) {
    let address = this.state.address;
    address[e.target.id] = e.target.value;
    this.setState({
      address
    });
  }
}

export default CreateProperty;
