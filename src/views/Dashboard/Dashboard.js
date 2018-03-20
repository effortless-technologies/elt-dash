import React, { Component } from 'react';
import axios from 'axios'
import {
  Button,
  Col,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Fade,
  ListGroupItem,
  Row
} from 'reactstrap';
import Expandable from "../../components/Expandable";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: [],
      properties: {},
    };
  }

  componentWillMount() {
    this.GetProperties();
  }

  render() {
    console.log(this.state.schema);
    if (this.state.properties.length < 1) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      let propertiesArray = [];
      for (let key in this.state.properties) {
        let subArray = [];
        subArray.push(key);
        subArray.push(this.state.properties[key]);
        propertiesArray.push(subArray)
      }

      let schema = this.state.schema;
      return (
        <div>
          {propertiesArray.map(function (property, index) {
            // console.log(property);
            return (
              <Exp property={property[1]} key={index} schema={schema}/>
            );
          })}
        </div>
      )
    }
  }

  GetProperties() {
    axios.get('http://localhost:5000/properties')
      .then(response => this.setState({
        schema: response.data.schema,
        properties: response.data.payload
      }))
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
      key: props.key,
      property: props.property,
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
    let property = this.state.property;
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
              <Button color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Back</Button>
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
            <Button color="primary" onClick={this.toggle} style={{marginBottom: '0px'}}>Toggle</Button>
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
