import React, { Component } from 'react';
import axios from 'axios'

import Auth from '../../modules/Auth/Auth'
import Exp from './Property.js'

import {
  Button,
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
      properties: [],
      requests: 0
    }
  }

  componentWillMount() {
    this.getSmartsheets();
    this.getProperties();
  }

  render() {
    if (this.state.requests > 1) {
      this.parseProperties()
    }

    if (isEmpty(this.state.properties)) {
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
            <span className='key hide-keys' style={{fontWeight: 'bold', color: 'red'}}>
              Missing Lodgix ID
            </span>
            <span className='key-detail hide-keys' style={{fontWeight: 'bold', color: 'black'}}>
              |
            </span>
            <span className='key-detail hide-keys' style={{fontWeight: 'bold', color: 'blue'}}>
              Missing Smartsheets
            </span>
            <span className='key-detail hide-keys' style={{fontWeight: 'bold', color: 'black'}}>
              |
            </span>
            <span className='key-detail hide-keys' style={{fontWeight: 'bold', color: 'black'}}>
              Has Smartsheets and Logdix ID
            </span>
            <span className='key-detail hide-count' style={{color: 'black'}}>
              (Smartsheets Count: {this.state.smartsheetsCount}
            </span>
            <span className='key-detail hide-count' style={{color: 'black'}}>
              | Properties Count: {this.state.propertiesCount})
            </span>
          </div>
          {filteredProperties.map(function (property, index) {
            if (property['property'] != null && property['smartsheets'] != null) {
              type = 'both'
            } else if (property['property'] == null) {
              type = 'smartsheets';
            } else if (property['smartsheets'] == null) {
              type = 'property';
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

  sortAbc(a, b) {
    if (a['6445695331788676'] < b['6445695331788676'])
      return -1;
    if (a['6445695331788676'] > b['6445695331788676'])
      return 1;
    return 0;
  }

  getSmartsheets() {
    axios.get('http://' + config.SMARTSHEETS_URI + ':' + config.SMARTSHEETS_PORT + '/properties')
      .then(
        response => {
          this.state.requests++;
          this.setState({
            schema: response.data.schema,
            smartsheets: response.data.payload,
            smartsheetsCount: response.data.count
      })});
  }


  getProperties() {
    let token = localStorage.getItem('id_token');
    axios.get(
      'http://' + config.PROPERTIES_URI + ':' + config.PROPERTIES_PORT + '/restricted/properties',
      { headers: {'Authorization': 'Bearer ' + token} }
    ).then(response => {
      this.state.requests++;
      this.setState({
        propertiesPayload: response.data,
        propertiesCount: response.data.length
      })});
  }

  parseProperties() {
    this.state.properties = [];
    let properties = [];
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
      properties.push(p);
    }

    for (let k in this.state.propertiesPayload) {
      let found = false;
      if (this.state.propertiesPayload[k].lodgix_id !== '') {
        for (let j in this.state.smartsheets) {
          if (this.state.smartsheets[j]['5806974957840260'] != null) {
            if (this.state.propertiesPayload[k].lodgix_id === this.state.smartsheets[j]['5806974957840260']) {
              found = true;
            }
          }
        }
      }
      if (found === false) {
        let p = {"property": this.state.propertiesPayload[k]};
        properties.push(p);
      }
    }

    this.state.properties = properties;
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