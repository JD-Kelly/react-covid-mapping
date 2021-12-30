import React, { Component } from "react";
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
      console.log(response.data.data);
    } catch (e) {
      console.log("unable to retrieve data", e);
    }
  }

  render() {
    const { countries_data, data_loaded } = this.state;

    return data_loaded ?  (
      <div className="root">
      </div>
    ) : null;
  }
}






export default App;
