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

const KEYS_TO_FILTERS = [
  'smartsheets.1951759380834180',
  'smartsmeets.6455359008204676',
  'smartsheets.4203559194519428',
  'smartsheets.6445695331788676',
  'property.address.street_address_1',
  'property.address_street_address_2',
  'property.address.city',
  'property.address.state'
];

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
      propertiesPayload: [],
      propertiesCount: 0,
      smartsheets: {},
      smartsheetsCount: 0,
      searchTerm: "",
      properties: []
    }
  }

  componentWillMount() {
    this.getSmartsheets();
    this.getProperties();
  }

  render() {
    if (this.state.properties.length === 0) {
      this.parseProperties();
    }

    if (isEmpty(this.state.smartsheets)) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      let type = '';
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
            <span className='key-detail' style={{fontWeight: 'bold', color: 'black'}}>
              | Smartsheets Count: {this.state.smartsheetsCount}
            </span>
            <span className='key-detail' style={{fontWeight: 'bold', color: 'black'}}>
              | Properties Count: {this.state.propertiesCount}
            </span>
          </div>
          {filteredProperties.map(function (property, index) {
            if (property['property'] != null && property['smartsheets'] != null) {
              type = 'both'
            } else if (property['property'] == null) {
              type = 'smartsheets';
            }

            let hasLodgix = false;
            if (filteredProperties[index]['5806974957840260'] != null) {
              hasLodgix = true;
            }

            return (
              <div>
                <Exp
                  property={property}
                  schema={schema}
                  hasLodgix={hasLodgix}
                  type={type}
                />
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

  getSmartsheets() {
    axios.get('http://' + config.SMARTSHEETS_URI + ':' + config.SMARTSHEETS_PORT + '/properties')
      .then(response => this.setState({
        schema: response.data.schema,
        smartsheets: response.data.payload,
        smartsheetsCount: response.data.count
      }))
  }


  getProperties() {
    let token = localStorage.getItem('id_token');
    axios.get(
      'http://' + config.PROPERTIES_URI + ':' + config.PROPERTIES_PORT + '/restricted/properties',
      { headers: {'Authorization': 'Bearer ' + token} }
    ).then(response => {
      this.setState({
        propertiesPayload: response.data,
        propertiesCount: response.data.length
      })})
  }

  parseProperties() {
    for (let key in this.state.smartsheets) {
      let p = {"smartsheets": this.state.smartsheets[key]};
      if (this.state.smartsheets[key]['5806974957840260'] != null) {
        let lodgix_id = this.state.smartsheets[key]['5806974957840260'];
        this.state.propertiesPayload.map(function (property, index) {
          if (lodgix_id === property.lodgix_id) {
            p['property'] = property
          }
        })
      }
      this.state.properties.push(p);
    }
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
    this.handleAddress = this.handleAddress.bind(this);
    this.state = {
      collapse: false,
      status: 'Closed',
      fadeIn: true,
      timeout: 300,
      searchTerm: "",
      hasLodgix: this.props.hasLodgix,
      type: this.props.type,
      property: this.props.property
    };
  }

  componentWillReceiveProps(nextProps){
    this.state.property = nextProps.property;
    this.state.hasLodgix = nextProps.hasLodgix;
    this.state.type = nextProps.type;
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

  handleAddress(address) {
    return (
      <span>
        <span>{address.street_address_1} </span>
        <span>{address.street_address_2} </span>
        <span>{address.city} </span>
        <span>{address.state} </span>
        <span>{address.zip_code}</span>
      </span>
    )
  }

  render() {
    let property = this.state.property;

    if (this.state.type === 'smartsheets') {

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
                <div className="full">
                  <Button className="back-button" outline color="primary" onClick={this.toggle}
                          style={{marginBottom: '0px'}}>Back</Button>
                  <span>
                  <SearchInput className="detail-search-input" onChange={this.searchUpdated}/>
                </span>
                </div>
                <div>&nbsp;</div>
                {filteredAttributes.map(function (attribute, index) {
                  return (
                    <div>
                      <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                      <span>:&nbsp;</span>
                      <span>{property.smartsheets[attribute.id]}</span>
                    </div>
                  );
                })}
              </CardBody>
            </Collapse>
            <CardFooter>
              <Button outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Expand</Button>
              <span className="list-div">
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'red'}}>
                {property.smartsheets[6445695331788676]}</span>
              <span className="list-title">-</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'red'}}>
                {property.smartsheets[1951759380834180]}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'red'}}>
                {property.smartsheets[6455359008204676]}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'red'}}>
                {property.smartsheets[4203559194519428]}</span>
            </span>
            </CardFooter>
          </Card>
        </div>
      )
    } else if (this.state.type === 'both') {
      let keysToFilter = [];
      for (let key in this.state.property.property) {
        let keySchema = {'title': '', 'id': ''};
        keySchema.title = key;
        keySchema.id = key;
        keysToFilter.push(keySchema);
      }

      let filteredAttributes = keysToFilter.filter(createFilter(this.state.searchTerm, ['title']));
      let handleAddress = this.handleAddress;

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
                  <Button className="back-button" outline color="primary" onClick={this.toggle}
                          style={{marginBottom: '0px'}}>Back</Button>
                  <span>
                  <SearchInput className="detail-search-input" onChange={this.searchUpdated}/>
                </span>
                </div>
                <div>&nbsp;</div>
                {filteredAttributes.map(function (attribute, index) {
                  return (
                    <div>
                      {(() => {
                        if (attribute.title === 'address') {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              {handleAddress(property.property.address)}
                            </div>
                          );
                        } else if (attribute.title === 'beds') {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.property.beds.length}</span>
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.property[attribute.id]}</span>
                            </div>
                          )
                        }
                      })()}
                    </div>
                  )
                })}
              </CardBody>
            </Collapse>
            <CardFooter>
              <Button outline color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Expand</Button>
              <span className="list-div">
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'black'}}>
                {property.smartsheets[6445695331788676]}</span>
              <span className="list-title">-</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'black'}}>
                {property.property.address.street_address_1}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'black'}}>
                {property.property.address.city}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'black'}}>
                {property.property.address.state}</span>
            </span>
            </CardFooter>
          </Card>
        </div>
      )
    }
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }
}
