import React, { Component } from "react";
import { coordinates } from "./country_coordinates"
import axios from "axios";

import './App.css';

const initialState = {
  countries_data: [],
  data_loaded: false
};

class App extends Component{
  state = initialState;

  componentDidMount() {
    this.fetchCountryData();
  }

  fetchCountryData = async () => {
    try {
      const response = await axios({
        method:"get",
        url: "https://corona-api.com/countries",
      });
      const countries_data = this.processData(response.data.data);
      this.setState({
        countries_data,
        data_loaded: true
      })
    } catch (e) {
      console.log("unable to retrieve data", e);
    }
  }

  processData = (data) => {
    let processed = [];

    for (const d of data) {
      let obj = {
        name: d.name,
        code: d.code, 
        updated_at: d.updated_at,
        confirmed: d.latest_data.confirmed,
        deaths: d.latest_data.deaths,
        recovered: d.latest_data.recovered,
      };
      
// patch for country co-ordinates
obj['coordinates'] = {
  latitude:
    coordinates.find(f => f.country_code === d.code) !== undefined ? 
    coordinates.find(f => f.country_code === d.code).latlng[0] : 0,
  longitude:
    coordinates.find(f => f.country_code === d.code) !== undefined ? 
    coordinates.find(f => f.country_code === d.code).latlng[1] : 0,
    }
    processed.push(obj);
  }

    return processed;
};

  

  render() {
    const { countries_data, data_loaded } = this.state;

    return data_loaded ?  (
      <div className="root">
      </div>
    ) : null;
  }

}





export default App;
