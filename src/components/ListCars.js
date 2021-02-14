import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import FilterComponentList from "./FilterComponentList";
import Spinner from "./Spinner"

class ListCars extends Component {
  state = {
    cars: this.props.carsList,
    currentPage: 1,
    carsPerPage: 10,
    loading: true
  };

  componentDidMount = async () => {
    await this.props.getCarsList();
    this.setState({
      cars: this.props.carsList,
      loading: false
    });
  };

  render() {
    const vehicles = this.props.match.params.vehicles;
    console.log(vehicles);
    const vehicleModel = this.props.match.params.models;
    const vehicleLocation = this.props.match.params.location;
    const vehicleYearMin = this.props.match.params.yearMin;
    const vehicleYearMax = this.props.match.params.yearMax;
    const vehiclePriceMin = this.props.match.params.priceMin;
    const vehiclePriceMax = this.props.match.params.priceMax;
 
   
    let filteredCars = this.state.cars;

    const myStyle = {
      color: "#009688",
    };

    if (
      window.$.inArray(vehicles, [
        "All Cars",
        "Saloons",
        "Hatchbacks",
        "Station Wagons",
        "SUV",
        "Vans&Buses",
        "Trucks&Trailers",
        "Motorbikes",
      ]) >= 0
    ) {
      if (vehicles === "All Cars") {
        if (
          parseInt(vehicleYearMin) >= 1950 &&
          parseInt(vehicleYearMax) <= 2020
        ) {
          filteredCars = filteredCars.filter(
            (myCar) =>
              myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
          );
        }

        if (
          parseInt(vehiclePriceMin) >= 100000 &&
          parseInt(vehiclePriceMax) <= 30000000
        ) {
          filteredCars = filteredCars.filter(
            (myCar) =>
              myCar.price >= vehiclePriceMin && myCar.price <= vehiclePriceMax
          );
        }

        if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
          filteredCars = filteredCars.filter((myCar) =>
            myCar.location.includes(vehicleLocation)
          );
        }
      } else {
        filteredCars = filteredCars.filter((myCar) =>
          myCar.body.includes(vehicles)
        );
      }
    }

    if (
      window.$.inArray(vehicles, [
        "Brand New",
        "Foreign Used",
        "Locally Used",
      ]) >= 0
    ) {
      filteredCars = filteredCars.filter((myCar) =>
        myCar.condition.includes(vehicles)
      );
    }

    if (
      window.$.inArray(vehicles, [
        "Brand New",
        "Foreign Used",
        "Locally Used",
        "All Cars",
        "Saloons",
        "Hatchbacks",
        "Station Wagons",
        "SUV",
        "Vans&Buses",
        "Trucks&Trailers",
        "Motorbikes",
      ]) < 0
    ) {
      filteredCars = filteredCars.filter((myCar) =>
        myCar.make.includes(vehicles)
      );

      if (
        parseInt(vehicleYearMin) >= 1950 &&
        parseInt(vehicleYearMax) <= 2020
      ) {
        filteredCars = filteredCars.filter(
          (myCar) =>
            myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
        );
      }
      if (
        parseInt(vehiclePriceMin) >= 100000 &&
        parseInt(vehiclePriceMax) <= 30000000
      ) {
        filteredCars = filteredCars.filter(
          (myCar) =>
            myCar.price >= vehiclePriceMin && myCar.price <= vehiclePriceMax
        );
      }

      if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
        filteredCars = filteredCars.filter((myCar) =>
          myCar.location.includes(vehicleLocation)
        );
      }
      if (vehicleModel !== "All Models" && vehicleModel != null) {
        filteredCars = filteredCars.filter((myCar) =>
          myCar.model.includes(vehicleModel)
        );
        if (vehicleLocation !== "All Locations" && vehicleLocation != null) {
          filteredCars = filteredCars.filter((myCar) =>
            myCar.location.includes(vehicleLocation)
          );
        }

        if (
          parseInt(vehicleYearMin) >= 1950 &&
          parseInt(vehicleYearMax) <= 2020
        ) {
          filteredCars = filteredCars.filter(
            (myCar) =>
              myCar.year >= vehicleYearMin && myCar.year <= vehicleYearMax
          );
        }
      }
    }

    // else{
    //    filteredCars = cars.filter(myCar => myCar.make.includes(vehicles))
    //    if(vehicleModel != "All Models" && vehicleModel != null){
    //        filteredCars = filteredCars.filter(myCar => myCar.model.includes(vehicleModel))
    //    }
    // }

    // else{
    //     filteredCars = cars.filter(myCar => myCar.make.includes(vehicles))
    //     console.log(vehicles)
    //     // if(vehicleModel !== null){
    //     //     console.log(vehicleModel)
    //     //     console.log(filteredCars)
    //     //     filteredCars = filteredCars.filter(myCar => myCar.model.includes(vehicleModel))
    //     //     console.log(filteredCars)
    //     // }
    // }

    // if (vehicleModel != null && vehicleModel != "All Models") {
    //     console.log('Model to catch')

    // }

    return (
      <div>
        <div className="container">
          <nav aria-label="breadcrumb" style={{ marginTop: "70px" }}>
            <ol
              className="breadcrumb arr-right"
              style={{ backgroundColor: "#00bfa5" }}
            >
              <li className="breadcrumb-item ">
                <Link to={`/`} className="text-light">
                  Home
                </Link>
              </li>
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) >= 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/All Cars`} className="text-light">
                    All Cars
                  </Link>
                </li>
              ) : null}
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) < 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/All Cars`} className="text-light">
                    All Cars
                  </Link>
                </li>
              ) : null}
              {window.$.inArray(vehicles, [
                "All Cars",
                "Saloons",
                "Hatchbacks",
                "Station Wagons",
                "SUV",
                "Vans&Buses",
                "Trucks&Trailers",
                "Motorbikes",
                "Brand New",
                "Foreign Used",
                "Locally Used",
              ]) < 0 ? (
                <li className="breadcrumb-item ">
                  <Link to={`/listcars/${vehicles}`} className="text-light">
                    {vehicles}
                  </Link>
                </li>
              ) : null}
              {vehicleModel !== "All Models" ? (
                <li className="breadcrumb-item ">
                  <Link
                    to={`/listcars/${vehicles}/${vehicleModel}`}
                    className="text-light"
                  >
                    {vehicleModel}
                  </Link>
                </li>
              ) : null}
            </ol>
          </nav>

          <div className="row">
            <aside className="col-md-3 blog-sidebar">
              <h5 className="blog-post-title font-weight-bold" style={myStyle}>
                Filter
              </h5>
              <hr />
              <FilterComponentList />

              <div
                className="p-3 mb-3 bg-light text-light rounded"
                style={{ marginTop: "10px" }}
              >
                <h4 className="font-italic">Ad Section</h4>
                <p className="mb-0">
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
              </div>
            </aside>
            <div className="col-md-9">
              {
                <div>
                  {this.state.loading ? <Spinner/> : null}
                  {filteredCars.map((car) => (
                    <div key={car._id}>
                      <CarCard car={car} />
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carsList: state.carsList.carsList,
  };
}
export default connect(mapStateToProps, actions)(ListCars);
