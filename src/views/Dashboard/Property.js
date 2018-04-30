import React, { Component } from 'react';
import axios from 'axios'

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
} from 'reactstrap';

import SearchInput, {createFilter} from 'react-search-input'
import Editable from 'react-x-editable';

const env_config = require('../../../env.json')[process.env.NODE_ENV || 'dev'];

const EDITABLETEXTARRAY = [
  "lock_type",
  "community_code",
  "building_code",
  "location_of_linens",
  "thermostat_location",
  "main_water_location",
  "hot_water_location",
  "trash_pickup",
  "recycling_pickup",
  "recycling_location",
  "quirks",
  "unique_items"
];

const NONEDITABLETEXTARRAY = [
  "address",
  "beds",
  "baths",
  "sleeps",
  "lodgix_id"
];

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
      // let keysToFilter = [];
      // this.props.schema.map(function (scheme, index) {
      //   keysToFilter.push('id');
      // });

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
    } else if (this.state.type === 'property') {
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
                              {/*<span>{property.property[attribute.id]}</span>*/}
                              <span>
                                <Editable
                                  name="what up"
                                  dataType="text"
                                  mode="inline"
                                  title="Please enter username"
                                  value={property.property[attribute.id]}
                                  validate={(value) => {
                                    updateParameter(value, attribute.title)
                                  }}
                                />
                              </span>
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
              {/*<span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'blue'}}>*/}
                {/*{property.smartsheets['6445695331788676']}</span>*/}
                <span className="list-title">-</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'blue'}}>
                {property.property.address.street_address_1}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'blue'}}>
                {property.property.address.city}</span>
              <span className="list-title" id="textSpan" style={{fontWeight: 'bold', color: 'blue'}}>
                {property.property.address.state}</span>
            </span>
            </CardFooter>
          </Card>
        </div>
      )
    } else if (this.state.type === 'both') {
      let keysToFilter = [];
      for (let key in this.state.property.property) {
        if (EDITABLETEXTARRAY.indexOf(key) > -1 || NONEDITABLETEXTARRAY.indexOf(key) > -1) {
          let keySchema = {'title': '', 'id': ''};
          keySchema.title = key;
          keySchema.id = key;
          keysToFilter.push(keySchema);
        }
      }

      this.props.schema.map(function (scheme, index) {
        let keySchema = {'title': '', 'id': ''};
        keySchema.title = scheme.title;
        keySchema.id = scheme.id;
        keysToFilter.push(keySchema);
      });

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
                        } else if (attribute.title === 'sleeps') {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.property.sleeps}</span>
                            </div>
                          );
                        } else if (attribute.title === 'baths') {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.property.baths}</span>
                            </div>
                          );
                        } else if (attribute.title === 'house_type') {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.property.house_type}</span>
                            </div>
                          );
                        } else if (EDITABLETEXTARRAY.indexOf(attribute.title) > -1) {

                          return (
                            <div>
                              <span class='d-inline' id="textSpan" style={{fontWeight: 'bold'}}>
                                {attribute.title}
                              </span>
                              <span class='d-inline'>:&nbsp;</span>
                              <span class='d-inline'>
                                <Editable
                                  name={attribute.title}
                                  dataType="text"
                                  mode="inline"
                                  title="Please enter username"
                                  value={property.property[attribute.id]}
                                  display={(value) => {
                                    return (<span className='editable-attribute'>{value}</span>);
                                  }}
                                  validate={(value) => {
                                    updateParameter(value, attribute.title, property.property.id)
                                  }}
                                />
                              </span>
                            </div>
                          )
                        } else {
                          return (
                            <div>
                              <span id="textSpan" style={{fontWeight: 'bold'}}>{attribute.title}</span>
                              <span>:&nbsp;</span>
                              <span>{property.smartsheets[attribute.id]}</span>
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
                {property.smartsheets['6445695331788676']}</span>
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

    return(
      <div>hello world</div>
    )
  }

  searchUpdated(term) {
    this.setState({searchTerm: term});
  }
}

export default Exp;

const updateParameter = (value, param, propertyId) => {
  let data = {};
  data[param] = value;

  let token = localStorage.getItem('id_token');
  let headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  let config = {headers};
  axios.put(
    'http://' + env_config.PROPERTIES_URI + ':' + env_config.PROPERTIES_PORT + '/restricted/properties/' + propertyId,
    data,
    config
  ).then(response => {
    console.log(response)
  });
};
