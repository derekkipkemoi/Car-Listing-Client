import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Select from "react-select";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

import { priceFormat } from "./NumberFormat";
import { numberFormat } from "./NumberFormat";
import carsMakes from "../data/cars.json";
import Carousel from "nuka-carousel";
import Spinner from "./Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const carConditionOption = carsMakes.condition;
const carDutyOption = carsMakes.duty;
const carLocationOption = carsMakes.location;

class Dashboard extends Component {
  state = {
    loadingCars: true,
    userRetrived: null,
    carId: null,
    carName: null,
    data: this.props.carsList,

    carPrice: null,
    carMileage: null,
    carDescription: null,

    editCarPrice: null,
    editCarMileage: null,
    editCarDescription: null,
    editCarPriceNegotiable: true,

    carCondition: null,
    carLocation: null,
    carDuty: null,

    deleteError: null,
    soldError: null,
    sold: null,
    delete: null,
    percentage: 0,
    message: null,

    activeList: [],
    underReviewList: [],
    rejectedList: [],
    soldList: [],

    updateError: null,

    selectedCarConditionOption: null,
    selectedCarConditionOptionValue: null,

    selectedCarDutyOption: null,
    selectedCarDutyOptionValue: null,

    selectedCarLocationOption: null,
    selectedCarLocationOptionValue: null,

    VerifyEmailMessage: null,
    status: true,
    loading: false,
  };

  EditCarDetails = (car) => {
    console.log("carId", car._id)
    this.setState({
      carId: car._id,
      carName: car.name,
      message: null,
      carPrice: car.price,
      carMileage: car.mileage,
      carDescription: car.description,
      carLocation: car.location,
      carDuty: car.duty,
      carCondition: car.condition,
    });
  };

  handleCarsConditionChange = (selectedCarConditionOption) => {
    this.setState({
      selectedCarConditionOption,
      selectedCarConditionOptionValue: selectedCarConditionOption.label,
    });
  };

  handleCarsDutyChange = (selectedCarDutyOption) => {
    this.setState({
      selectedCarDutyOption,
      selectedCarDutyOptionValue: selectedCarDutyOption.label,
    });
  };

  handleCarsLocationChange = (selectedCarLocationOption) => {
    this.setState({
      selectedCarLocationOption,
      selectedCarLocationOptionValue: selectedCarLocationOption.label,
    });
  };

  priceChangeHandler = (event) => {
    this.setState({
      editCarPrice: event.target.value.replace(/,/g, ""),
    });
  };
  mileageChangeHandler = (event) => {
    this.setState({
      editCarMileage: event.target.value.replace(/,/g, ""),
    });
  };

  toggleChangePriceNegotiable = (event) => {
    if (event.target.cheked) {
      this.setState({
        editCarPriceNegotiable: true,
      });
    } else {
      this.setState({
        editCarPriceNegotiable: false,
      });
    }
  };

  descriptionChangeHandler = (event) => {
    this.setState({
      editCarDescription: event.target.value.replace(/,/g, ""),
    });
  };

  updateCar = async (carId) => {
    console.log("carId", carId)
    if (
      this.state.editCarPrice === null &&
      this.state.editCarMileage === null &&
      this.state.editCarDescription === null &&
      this.state.selectedCarConditionOptionValue === null &&
      this.state.selectedCarDutyOptionValue === null &&
      this.state.selectedCarLocationOptionValue === null
    ) {
      this.setState({
        updateError:
          "No Value updated, Please enter or Select a value you want to update",
      });
    } else {
      var { price, mileage, condition, duty, location, description } = "";
      if (this.state.editCarPrice !== null) {
        price = this.state.editCarPrice;
      } else {
        price = this.state.carPrice;
      }
      if (this.state.editCarMileage !== null) {
        mileage = this.state.editCarMileage;
      } else {
        mileage = this.state.carMileage;
      }
      if (this.state.selectedCarConditionOptionValue !== null) {
        condition = this.state.selectedCarConditionOptionValue;
      } else {
        condition = this.state.carCondition;
      }
      if (this.state.selectedCarDutyOptionValue !== null) {
        duty = this.state.selectedCarDutyOptionValue;
      } else {
        duty = this.state.carDuty;
      }
      if (this.state.selectedCarLocationOptionValue !== null) {
        location = this.state.selectedCarLocationOptionValue;
      } else {
        location = this.state.carLocation;
      }
      if (this.state.editCarDescription !== null) {
        description = this.state.editCarDescription;
      } else {
        description = this.state.carDescription;
      }

      this.setState({
        loading: true,
      });
      const params = JSON.stringify({
        condition: condition,
        duty: duty,
        location: location,
        price: parseFloat(price),
        mileage: parseFloat(mileage),
        description: description,
        priceNegotiable: this.state.editCarPriceNegotiable,
      });

      await this.props.carEdit(carId, JSON.parse(params));

      this.setState({
        message: this.props.message,
        loading: false,
      });

      await this.props.getUserCars(this.state.userRetrived.id);
      this.setState({
        data: this.props.carsList,
      });
    }
  };

  handleSold = async (carId) => {
    if (this.state.sold === "SOLD") {
      this.setState({
        loading: true,
      });
      await this.props.carSold(carId);

      this.setState({
        message: this.props.message,
      });

      await this.props.getUserCars(this.state.userRetrived.id);
      this.setState({
        data: this.props.carsList,
        loading: false,
      });
    } else {
      return;
    }
  };

  handleDelete = async (carId) => {
    if (this.state.delete === "DELETE") {
      this.setState({
        loading: true,
      });
      await this.props.deleteCar(carId, (progressEvent) => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        this.setState({ percentage: percentage });
        console.log(this.state.percentage);
        return percentage; // Because you were returning the percentage before.
      });

      this.setState({
        message: this.props.message,
      });
      console.log("Message", this.props.message);
      //window.location.reload(true);
      await this.props.getUserCars(this.state.userRetrived.id);
      this.setState({
        data: this.props.carsList,
        loading: false,
      });
    } else {
      return;
    }
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let soldErr = "";
    if (nam === "sold") {
      if (val === "SOLD") {
        soldErr = null;
      } else {
        soldErr = "Please type SOLD";
      }
    }

    this.setState({
      soldError: soldErr,
    });

    let deleteErr = "";
    if (nam === "delete") {
      if (val === "DELETE") {
        deleteErr = null;
      } else {
        deleteErr = "Please type DELETE";
      }
    }

    this.setState({
      deleteError: deleteErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  componentDidMount = async () => {
    await this.props.getSecret();
    this.setState({
      loadingCars: true,
      userRetrived: JSON.parse(localStorage.getItem("UserObject")),
    });
    if (this.state.userRetrived === null) {
      return;
    } else {
      if (this.state.userRetrived.method === "local") {
        if (!this.state.userRetrived.local.active) {
          this.setState({
            VerifyEmailMessage: "Please Verify Your Email Address",
            status: this.state.userRetrived.local.active,
          });
        }
      }

      await this.props.getUserCars(this.state.userRetrived.id);

      this.setState({
        data: this.props.carsList,
        loadingCars: false,
      });
    }

    // this.state.rejectedList = this.state.data.filter(
    //   (myCar) => myCar.status === "declined"
    // );
  };

  handleActiveStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "active");
      this.setState({
        data: carList,
      });
    }
  };

  handleUnderReviewStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "underreview");
      this.setState({
        data: carList,
      });
    }
  };

  handleSoldStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "sold");
      this.setState({
        data: carList,
      });
    }
  };
  handleDeclinedStatus = (carList) => {
    if (carList.length > 0) {
      carList = carList.filter((myCar) => myCar.status === "declined");
      this.setState({
        data: carList,
      });
    }
  };

  handleAllStatus = (carList) => {
    if (carList.length > 0) {
      this.setState({
        data: carList,
      });
    }
  };

  render() {
    let activeList = this.props.carsList;
    let rejectedList = this.props.carsList;
    let reviewingList = this.props.carsList;
    let soldList = this.props.carsList;

    if (activeList.length > 0) {
      activeList = activeList.filter((myCar) => myCar.status === "active");
    }

    if (rejectedList.length > 0) {
      rejectedList = rejectedList.filter(
        (myCar) => myCar.status === "declined"
      );
    }

    if (reviewingList.length > 0) {
      reviewingList = reviewingList.filter(
        (myCar) => myCar.status === "underreview"
      );
    }

    if (soldList.length > 0) {
      soldList = soldList.filter((myCar) => myCar.status === "sold");
    }

    // this.state.underReviewList = this.state.data.filter(
    //   (myCar) => myCar.status === "underreview"
    // );

    // this.state.rejectedList = this.state.data.filter(
    //   (myCar) => myCar.status === "declined"
    // );

    const imageStyle = {
      width: "100%",
      height: "15rem",
      objectFit: "cover",
    };

    const buttonStyle = {
      margin: "2px",
    };
    const iconsStyle = {
      color: "text-warning",
      marginRight: "10px",
    };
    const svgImageStyle = {
      width: "25px",
      marginRight: "5px",
      color: "#fff",
    };
  

    return (
      <div>
        <div className="container" style={{ marginTop: "70px" }}>
          {!this.state.status ? (
            <div className="alert alert-primary" role="alert">
              <small>
                Please activate your account to start Selling on Motii.We sent
                an activation email to{" "}
                <span className="font-weight-bold">
                  {this.state.userRetrived.local.email}
                </span>
              </small>
            </div>
          ) : null}

          <div className="row">
            <div className="col-md-10">
              <div className="text-center rounded shadow-sm">
                <h6 className="text-center font-weight-bold">
                  Manage Your Cars
                </h6>
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{ margin: "5px" }}
                  onClick={this.handleActiveStatus.bind(
                    this,
                    this.props.carsList
                  )}
                >
                  Active({activeList.length})
                </button>
                <button
                  type="button"
                  className="btn btn-outline-warning"
                  style={{ margin: "5px" }}
                  onClick={this.handleUnderReviewStatus.bind(
                    this,
                    this.props.carsList
                  )}
                >
                  UnderReview({reviewingList.length})
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  style={{ margin: "5px" }}
                  onClick={this.handleDeclinedStatus.bind(
                    this,
                    this.props.carsList
                  )}
                >
                  Rejected({rejectedList.length})
                </button>

                <button
                  type="button"
                  className="btn btn-outline-info"
                  style={{ margin: "5px" }}
                  onClick={this.handleSoldStatus.bind(
                    this,
                    this.props.carsList
                  )}
                >
                  Sold({soldList.length})
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{ margin: "5px" }}
                  onClick={this.handleAllStatus.bind(this, this.props.carsList)}
                >
                  All({this.props.carsList.length})
                </button>
              </div>
              {this.state.loading ? <Spinner /> : null}
              {this.state.data.map((car) => (
                <div key={car._id}>
                  <div className="row">
                    <div
                      className="card mt-3 ml-3 mr-3 w-100"
                      style={{ marginTop: "5px" }}
                    >
                      <div className="row no-gutters">
                        <div
                          className="col-sm-5"
                          style={{ background: "#868e96" }}
                        >
                          <Carousel>
                            {car.images.map((image, i) => (
                              <img
                                className="card-img"
                                src={image}
                                alt="Card"
                                style={imageStyle}
                              />
                            ))}
                          </Carousel>
                        </div>
                        <div className="col-sm-7 col-md-7">
                          <div className="card-body">
                            <Link
                              to={`/vehicle/${car._id}`}
                              className="text-dark"
                              style={{ textDecoration: "none" }}
                            >
                              <span className="card-title font-weight-bold">
                                {car.name}
                              </span>
                              <span className="card-title font-weight-bold text-right">
                                {" "}
                                {car.status === "active" ? (
                                  <div>
                                    <span className="text-success">Active</span>{" "}
                                  </div>
                                ) : null}
                                {car.status === "declined" ? (
                                  <div>
                                    <span className="text-danger">
                                      Rejected
                                    </span>{" "}
                                  </div>
                                ) : null}
                                {car.status === "underreview" ? (
                                  <div>
                                    <span className="text-warning">
                                      Under Review
                                    </span>{" "}
                                  </div>
                                ) : null}
                                {car.status === "sold" ? (
                                  <div>
                                    <span className="text-info">Sold</span>{" "}
                                  </div>
                                ) : null}
                              </span>
                              <h5
                                className="card-title font-weight-bold"
                                style={{ color: "#009688" }}
                              >
                                {priceFormat(car.price)}{" "}
                                <span
                                  className="font-weight-bold"
                                  style={{ fontSize: "14px", color: "#ffa010" }}
                                >
                                  {car.priceNegotiable ? "Negotiable" : null}
                                </span>
                              </h5>
                              <h5
                                className="card-title font-weight-bold"
                                style={{ fontSize: "15px" }}
                              >
                                <FontAwesomeIcon
                                  icon="map-marker-alt"
                                  style={iconsStyle}
                                />
                                {car.location}
                              </h5>
                              <p
                                className="card-title"
                                style={{ fontSize: "15px" }}
                              >
                                <span>
                                  {" "}
                                  <img
                                    style={svgImageStyle}
                                    alt="Clock"
                                    src={require("../assets/svgs/gauge.svg")}
                                  />
                                  {numberFormat(car.mileage)} Km |
                                </span>
                                <span>
                                  {" "}
                                  <img
                                    style={svgImageStyle}
                                    src={require("../assets/svgs/new-product.svg")}
                                    alt="..."
                                  />
                                  {car.condition}|
                                </span>
                                <span>
                                  {" "}
                                  <img
                                    style={svgImageStyle}
                                    src={require("../assets/svgs/color.svg")}
                                    alt="..."
                                  />
                                  {car.color}|
                                </span>
                                <span>
                                  {" "}
                                  <img
                                    style={svgImageStyle}
                                    alt="Clock"
                                    src={require("../assets/svgs/gear_box.svg")}
                                  />
                                  {car.transmission}
                                </span>
                              </p>
                            </Link>

                            {car.status === "active" ? (
                              <span>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, car)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>

                                <Link
                                  type="button"
                                  className="btn btn-outline-primary"
                                  to={`/marketcar/${car._id}`}
                                  style={buttonStyle}
                                >
                                  Sell Faster
                                </Link>

                                <button
                                  type="button"
                                  className="btn btn-outline-success"
                                  data-toggle="modal"
                                  data-target="#markCarSoldModal"
                                  onClick={this.EditCarDetails.bind(this, car)}
                                  style={buttonStyle}
                                >
                                  Mark as Sold
                                </button>
                              </span>
                            ) : null}

                            {car.status === "declined" ? (
                              <span>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, car)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>
                              </span>
                            ) : null}

                            {car.status === "underreview" ? (
                              <span>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary"
                                  data-toggle="modal"
                                  data-target="#editCarModal"
                                  onClick={this.EditCarDetails.bind(this, car)}
                                  style={buttonStyle}
                                >
                                  Edit Car
                                </button>
                              </span>
                            ) : null}

                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              data-toggle="modal"
                              data-target="#deleteCar"
                              onClick={this.EditCarDetails.bind(this, car)}
                              style={buttonStyle}
                            >
                              Delete Car
                            </button>
                          </div>

                          <div
                            className="modal fade"
                            id="editCarModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {this.state.carName}
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="form-group">
                                      <label
                                        htmlFor="price-name"
                                        className="col-form-label"
                                      >
                                        Price(Ksh){" "}
                                      </label>
                                      <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control text-dark"
                                        placeholder={priceFormat(
                                          this.state.carPrice
                                        )}
                                        name="price"
                                        onChange={this.priceChangeHandler}
                                        inputMode="numeric"
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="description-text"
                                        className="col-form-label"
                                      >
                                        Price is Negotiable:
                                      </label>
                                      <input
                                        type="checkbox"
                                        className="orm-control"
                                        id="priceIsNegotiable"
                                        onChange={
                                          this.toggleChangePriceNegotiable
                                        }
                                        defaultChecked={true}
                                      />
                                    </div>
                                    <div className="form-group">
                                      <label
                                        htmlFor="mileage-name"
                                        className="col-form-label"
                                      >
                                        Mileage(Km){" "}
                                      </label>
                                      <NumberFormat
                                        thousandSeparator={true}
                                        className="form-control text-dark"
                                        placeholder={
                                          numberFormat(this.state.carMileage) +
                                          " Km"
                                        }
                                        name="mileage"
                                        onChange={this.mileageChangeHandler}
                                        inputMode="numeric"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label
                                        htmlFor="condition-name"
                                        className="col-form-label"
                                      >
                                        Condition
                                      </label>
                                      <Select
                                        value={
                                          this.state.selectedCarConditionOption
                                        }
                                        onChange={
                                          this.handleCarsConditionChange
                                        }
                                        options={carConditionOption}
                                        placeholder={this.state.carCondition}
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label
                                        htmlFor="duty-name"
                                        className="col-form-label"
                                      >
                                        Duty
                                      </label>
                                      <Select
                                        value={this.state.selectedCarDutyOption}
                                        onChange={this.handleCarsDutyChange}
                                        options={carDutyOption}
                                        placeholder={this.state.carDuty}
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label
                                        htmlFor="location-name"
                                        className="col-form-label"
                                      >
                                        Location
                                      </label>
                                      <Select
                                        value={
                                          this.state.selectedCarLocationOption
                                        }
                                        onChange={this.handleCarsLocationChange}
                                        options={carLocationOption}
                                        placeholder={this.state.carLocation}
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label
                                        htmlFor="description-text"
                                        className="col-form-label"
                                      >
                                        Description:
                                      </label>
                                      <textarea
                                        rows="3"
                                        minLength="50"
                                        className="form-control"
                                        onChange={this.descriptionChangeHandler}
                                        placeholder={this.state.carDescription}
                                      ></textarea>
                                    </div>
                                    <p className="text-danger">
                                      {this.state.updateError}
                                    </p>
                                    {this.state.loading ? <Spinner /> : null}
                                    <p className="text-success">
                                      {this.state.message}
                                    </p>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary"
                                    onClick={this.updateCar.bind(
                                      this,
                                      this.state.carId
                                    )}
                                  >
                                    Update Car
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="modal fade"
                            id="markCarSoldModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {this.state.carName}
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="form-group">
                                      <label
                                        htmlFor="recipient-name"
                                        className="col-form-label"
                                      >
                                        Type SOLD To Confirm:
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="sold"
                                        onChange={this.handleChange}
                                      />
                                      <p className="text-danger">
                                        {this.state.soldError}
                                      </p>
                                      {this.state.loading ? <Spinner /> : null}
                                      <p className="text-success">
                                        {this.state.message}
                                      </p>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={this.handleSold.bind(
                                      this,
                                      this.state.carId
                                    )}
                                  >
                                    Mark Car As Sold
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div
                            className="modal fade"
                            id="deleteCar"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title"
                                    id="exampleModalLabel"
                                  >
                                    {this.state.carName}
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                  >
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <form>
                                    <div className="form-group">
                                      <label
                                        htmlFor="recipient-name"
                                        className="col-form-label"
                                      >
                                        Type DELETE To Confirm:
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="delete"
                                        onChange={this.handleChange}
                                      />
                                      <p className="text-danger">
                                        {this.state.deleteError}
                                      </p>
                                      {this.state.loading ? <Spinner /> : null}
                                      <p className="text-success">
                                        {this.state.message}
                                      </p>
                                    </div>
                                  </form>
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={this.handleDelete.bind(
                                      this,
                                      this.state.carId
                                    )}
                                  >
                                    Delete Car
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="col-md-2 blog-sidebar">
              <div className="p-2 mb-2 bg-light text-light rounded">
                <p className="mb-0">
                  Etiam porta <em>sem malesuada magna</em> mollis euismod. Cras
                  mattis consectetur purus sit amet fermentum. Aenean lacinia
                  bibendum nulla sed consectetur.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    resource: state.dashboard.secret,
    carsList: state.userCarsList.carsList,
    message: state.carActions.message,
  };
}
export default connect(mapStateToProps, actions)(Dashboard);
