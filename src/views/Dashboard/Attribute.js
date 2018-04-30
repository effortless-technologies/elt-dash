import React, { Component } from 'react';

import Editable from 'react-x-editable';
import axios from "axios/index";

// If updating == true, then spinner
// If response == 200, temp checkmark next to edited attribute

class EditableAttribute extends Component {
  constructor(props){
    super(props);
    this.state = {
      updating: false,
      name: this.props.name,
      dataType: this.props.dataType,
      mode: this.props.mode,
      title: this.props.title,
      value: this.props.value,
      // display: this.props.display,
    }
  }

  render() {
    return (
      <div>
        <Editable
          name=this.state.name
          dataType=this.state.dataType
          mode=this.state.mode
          title=this.state.title
          value=this.state.value
          validate={(value) => {
            updateParameter(value, attribute.title, property.property.id)
          }}
        />
      </div>
    )
  }
}

export default EditableAttribute;

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
