import React, { Component } from 'react';

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Collapse,
} from 'reactstrap';

import SearchInput, {createFilter} from 'react-search-input'

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
        if (key === 'address' ||
          key === 'beds' ||
          key === 'baths' ||
          key === 'sleeps' ||
          key === 'lodqix_id' ||
          key === 'house_type') {
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

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }
}

export default Exp;
