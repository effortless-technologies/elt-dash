import React, { Component } from 'react';
import axios from 'axios'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
  InputGroup,
} from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input'

const KEYS_TO_FILTERS = ['1951759380834180', '6455359008204676', '4203559194519428'];

function isEmpty(myObject) {
  for(var key in myObject) {
    if (myObject.hasOwnProperty(key)) {
      return false;
    }
  }

  return true;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: [],
      properties: {},
      searchTerm: "",
    };
    this.searchUpdated = this.searchUpdated.bind(this)
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
      let schema = this.state.schema;
      return (
        <div>
          <InputGroup>
            <SearchInput className="search-input" onChange={this.searchUpdated} />
          </InputGroup>
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
    axios.get('http://localhost:5000/properties')
      .then(response => this.setState({
        schema: response.data.schema,
        properties: response.data.payload
      }))
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
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
    this.state = {
      collapse: false,
      status: 'Closed',
      fadeIn: true,
      timeout: 300
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
              <div>&nbsp;</div>
              {this.props.schema.map(function (scheme, index) {
                return (
                  <div>
                    <span id="textSpan" style={{fontWeight: 'bold'}}>{scheme.title}</span>
                    <span>:&nbsp;</span>
                    <span>{property[scheme.id]}</span>
                  </div>
                );
              })}
            </CardBody>
          </Collapse>
          <CardFooter>
            <Button outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Expand</Button>
            <span>&nbsp;</span>
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
}
