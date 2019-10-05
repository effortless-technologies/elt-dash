import React, { Component } from 'react';
import axios from 'axios'

import Auth from '../../modules/Auth/Auth'

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
  Row,
} from 'reactstrap';

import SearchInput, {createFilter} from 'react-search-input'

const config = require('../../../env.json')[process.env.NODE_ENV || 'dev'];

class NewRecipe extends Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
    this.state = {
      newRecipe: {
        title: "",
        sourceUrl: "",
      },
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Row>
          <Col xs="6">
            <Card>
              <CardHeader>
                <strong>New Recipe</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="recipeTitle"
                        name="recipeTitle"
                        placeholder="Text"
                        onChange={(e) => this.updateOwner(e)}
                        value={this.state.newRecipe.title}
                      />
                    </Col>
                  </FormGroup>
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
          </Col>
          <Col xs="6">
            <Card>
              <CardHeader>
                <strong>New Recipe</strong>
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Title</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="recipeTitle"
                        name="recipeTitle"
                        placeholder="Text"
                        onChange={(e) => this.updateOwner(e)}
                        value={this.state.newRecipe.title}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Reciple Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="recipeSourceUrl"
                        name="recipeSourceUrl"
                        placeholder="Text"
                        onChange={(e) => this.updateOwner(e)}
                        value={this.state.newRecipe.sourceUrl}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Reciple Image Url</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                        type="text"
                        id="recipeImageUrl"
                        name="recipeImageUrl"
                        placeholder="Text"
                        onChange={(e) => this.updateOwner(e)}
                        value={this.state.newRecipe.sourceUrl}
                      />
                    </Col>
                  </FormGroup>
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
          </Col>
        </Row>
      </div>
    )
  }


  // logout() {
  //   this.Auth.logout();
  //   this.props.history.replace('/login');
  // }
}

export default NewRecipe;
