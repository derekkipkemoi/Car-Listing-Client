import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

import CarBrands from "./CarBrands";
import CarBody from "./CarBody";
import CarCondition from "./CarCondition";
import Carousel from "./Carousel";
import TrendingCarCard from "./TrendingCarCard";
import JumbotronHome from "./JumbotronHome";
import Spinner from "./Spinner";

class Home extends Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount = async () => {
    await this.props.getCarsList();
    this.setState({
      data: this.props.carsList,
      loading: false,
    });
  };

  render() {
    const data = this.state.data;

    return (
      <div>
        <div>
          <JumbotronHome />
        </div>

        <div className="container">
          <div>
            {this.state.loading ? <Spinner /> : null}
            <Carousel key={data} data={data} />
          </div>

          <div>
            <CarCondition />
          </div>

          <div>
            <CarBody />
          </div>

          <div>
            <CarBrands />
          </div>
        </div>
      </div>
    );
  }
}

function mapSateToProps(state) {
  return {
    carsList: state.carsList.carsList,
  };
}

export default connect(mapSateToProps, actions)(Home);
