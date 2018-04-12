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
    this.Auth = new Auth();
    this.sortAbc = this.sortAbc.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
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
      filteredProperties.sort(this.sortAbc);
      let schema = this.state.schema;

      return (
        <div>
          <div className='head'>
            <Button
              className="logout-button"
              outline color="primary"
              onClick={() => this.logout()}
              style={{marginBottom: '0px'}}>Logout
            </Button>
            <span>
              <SearchInput className="list-search-input" onChange={this.searchUpdated} />
            </span>
            <span className='key' style={{fontWeight: 'bold', color: 'red'}}>
              Red
            </span>
            <span className='key-detail' style={{fontWeight: 'bold', color: 'black'}}>
              - Missing Lodgix ID
            </span>
          </div>
          {filteredProperties.map(function (property, index) {
            let hasLodgix = false;
            if (filteredProperties[index]['5806974957840260'] != null) {
              hasLodgix = true;
            }

            return (
              <div>
                <Exp property={filteredProperties[index]} schema={schema} hasLodgix={hasLodgix}/>
              </div>
            );
          })}
        </div>
      )
    }
  }

  sortAbc(a,b) {
    if (a['6445695331788676'] < b['6445695331788676'])
      return -1;
    if (a['6445695331788676'] > b['6445695331788676'])
      return 1;
    return 0;
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
      hasLodgix: this.props.hasLodgix,
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

    let color = 'black';
    if (this.state.hasLodgix == false) {
      color = 'red';
    }

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
              <div className="full">
                <Button className="back-button" outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Back</Button>
                <span>
                  <SearchInput className="detail-search-input" onChange={this.searchUpdated} />
                </span>
              </div>
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
            <span className="list-div">
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: color}}>
                {property[6445695331788676]}</span>
              <span className="list-title">-</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: color}}>
                {property[1951759380834180]}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: color}}>
                {property[6455359008204676]}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: color}}>
                {property[4203559194519428]}</span>
            </span>
          </CardFooter>
        </Card>
      </div>
    )
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }
}
