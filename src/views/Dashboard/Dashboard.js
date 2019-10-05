import React, { Component } from 'react';
import axios from 'axios'

import Auth from '../../modules/Auth/Auth'

import {
  Col,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardImg,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  Row,
} from 'reactstrap';

import SearchInput, {createFilter} from 'react-search-input'

const config = require('../../../env.json')[process.env.NODE_ENV || 'dev'];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.logout = this.logout.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this)
    this.search = this.search.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      search: "",
      recipesSearchResponse: {},
    }
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <Card>
          <CardHeader>
            <strong>Search Recipes</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="3">
                <Button type="submit" color="primary" onClick={() => this.search(this.state.search)}>
                  Submit
                </Button>
              </Col>
              <Col xs="12" md="9">
                <Input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Text"
                  onChange={(e) => this.updateSearch(e)}
                  value={this.state.search}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        {this.renderSearchResults()}
      </div>
    )
  }

  renderSearchResults() {
    if (this.isEmpty(this.state.recipesSearchResponse)) {
      return <div></div>;
    } else {
      if (this.state.recipesSearchResponse.count === 0) {
        <div>no results</div>
      } else {
        return (
          <div>
          {this.state.recipesSearchResponse.recipes.map((recipe, index) => (
            <div>
              <Card>
                <CardBody>
                  <Row>
                    <Col md="3">
                      <CardImg top width="100%" src={recipe.image_url} />
                    </Col>
                    <Col xs="12" md="9">
                      <CardTitle>{recipe.title}</CardTitle>
                      <CardText>Pulisher: {recipe.publisher}</CardText>
                      <CardText>URL: {recipe.source_url}</CardText>
                      <Button type="submit" color="primary" onClick={() => this.search(this.state.search)}>
                        Create
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </div>
          ))}
          </div>
        )
      }
    }
  }

//   "publisher": "The Pioneer Woman",
// "f2f_url": "http://food2fork.com/view/47025",
// "title": "Pasta with Pesto Cream Sauce",
// "source_url": "http://thepioneerwoman.com/cooking/2011/06/pasta-with-pesto-cream-sauce/",
// "recipe_id": "47025",
// "image_url": "http://static.food2fork.com/pestoa0e7.jpg",
// "social_rank": 100,
// "publisher_url": "http://thepioneerwoman.com"

  search(searchTerm) {
    let headers = {
      'Accept': 'application/json',
    };

    let config = {
      headers
    };

    var self = this;
    axios.get('http://localhost:7000/food2fork/search', {
      params: {
        term: this.state.search,
      }
    })
    .then(function (response) {
      console.log(response);
      self.setState({recipesSearchResponse: response.data})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateSearch(e) {
    let search = this.state.search;
    search = e.target.value;
    this.setState({
      search
    });
  }

  isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  // logout() {
  //   this.Auth.logout();
  //   this.props.history.replace('/login');
  // }
}

export default Dashboard;
