import React, { Component } from 'react';
import axios from 'axios'

import Auth from '../../modules/Auth/Auth'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
  InputGroup,
} from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input'

const config = require('../../../env.json')[process.env.NODE_ENV || 'dev'];

const KEYS_TO_FILTERS = ['1951759380834180', '6455359008204676', '4203559194519428', '6445695331788676'];

function isEmpty(myObject) {
  for(let key in myObject) {
    if (myObject.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.Auth = new Auth();
    this.logout = this.logout.bind(this);
    this.state = {
      schema: [],
      properties: {},
      searchTerm: "",
    };
  }

  componentWillMount() {
    this.getProperties();
  }

  render() {
    console.log(this.state.schema);

    if (isEmpty(this.state.properties)) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      let propertiesArray = [];
      for (let key in this.state.properties) {
        propertiesArray.push(this.state.properties[key])
      }

      let filteredProperties = propertiesArray.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
      let schema = this.state.schema;

      return (
        <div>
          <div>
            <Button
              className="logout-button"
              outline color="primary"
              onClick={() => this.logout()}
              style={{marginBottom: '0px'}}>Logout
            </Button>
            <span>
              <SearchInput className="search-input" onChange={this.searchUpdated} />
            </span>
          </div>
          {filteredProperties.map(function (property, index) {
            return (
              <div>
                <Exp property={filteredProperties[index]} schema={schema}/>
              </div>
            );
          })}
        </div>
      )
    }
  }

  getProperties() {
    axios.get('http://' + config.PROPERTIES_URI + ':' + config.PROPERTIES_PORT + '/properties')
      .then(response => this.setState({
        schema: response.data.schema,
        properties: response.data.payload
      }))
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }

  logout() {
    this.Auth.logout();
    this.props.history.replace('/login');
  }
}

export default Dashboard;

class Exp extends Component {
  constructor(props) {
    super(props);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.state = {
      collapse: false,
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      searchTerm: "",
    };
  }

  onEntering() {
    this.setState({status: 'Opening...'});
  }

  onEntered() {
    this.setState({status: 'Opened'});
  }

  onExiting() {
    this.setState({status: 'Closing...'});
  }

  onExited() {
    this.setState({status: 'Closed'});
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  toggleFade() {
    this.setState({fadeIn: !this.state.fadeIn});
  }

  render() {
    let property = this.props.property;

    let keysToFilter = [];
    this.props.schema.map(function (scheme, index) {
      keysToFilter.push('id');
    });

    let filteredAttributes = this.props.schema.filter(createFilter(this.state.searchTerm, ["title"]));

    return (
      <div className="animated fadeIn">
        <Card style={{margin: '0px'}}>
          <Collapse
            isOpen={this.state.collapse}
            onEntering={this.onEntering}
            onEntered={this.onEntered}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            <CardBody>
              <Button outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Back</Button>
              <span><InputGroup>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
              </InputGroup></span>
              <div>&nbsp;</div>
              {filteredAttributes.map(function (attribute, index) {
                return (
                  <div>
                    <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                    <span>:&nbsp;</span>
                    <span>{property[attribute.id]}</span>
                  </div>
                );
              })}
            </CardBody>
          </Collapse>
          <CardFooter>
            <Button outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Expand</Button>
            <span>&nbsp;</span>
            <span id="textSpan" style={{fontWeight: 'bold'}}>{property[6445695331788676]}</span>
            <span>&nbsp;</span>
            <span>-</span>
            <span>&nbsp;</span>
            <span id="textSpan" style={{fontWeight: 'bold'}}>{property[1951759380834180]}</span>
            <span>&nbsp;</span>
            <span id="textSpan" style={{fontWeight: 'bold'}}>{property[6455359008204676]}</span>
            <span>&nbsp;</span>
            <span id="textSpan" style={{fontWeight: 'bold'}}>{property[4203559194519428]}</span>
          </CardFooter>
        </Card>
      </div>
    )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }
}
