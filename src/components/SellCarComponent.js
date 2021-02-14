import React, { Component } from "react";
import { reduxForm} from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FilterSellcarComponent from "./SellCar/FilterSellCarComponenet";
import * as actions from "../actions";
import carsMakes from "../data/cars.json";
import Progress from "./Progress";
import NumberFormat from "react-number-format";
import Spinner from "./Spinner";

const commonFeatures = carsMakes.commonFeatures;
const extraFeatures = carsMakes.extraFeatures;
var phoneno = /^\d{10}$/;

class SellcarComponent extends Component {
  // initialize your options array on your state

  state = {
    make: null,
    model: null,
    year: null,
    body: null,
    condition: null,
    transmission: null,
    duty: null,
    fuel: null,
    interior: null,
    color: null,
    location: null,
    sellerName: null,
    sellerNumber: null,
    sellerNameError: null,
    sellerPhoneError: null,
    carObject: null,

    phone: null,
    userRetrived: JSON.parse(localStorage.getItem("UserObject")),

    price: null,
    mileage: null,
    engineSize: null,
    description: null,
    errorPrice: null,
    errorMileage: null,
    errorEngineSize: null,
    errorDescription: null,
    priceIsNegotiable: true,

    MakeError: true,
    modelError: true,
    yearError: true,
    bodyError: true,
    conditionError: true,
    transmissionError: true,
    dutyError: true,
    fuelError: true,
    interiorError: true,
    colorError: true,
    locationError: true,
    imagesError: null,
    value: "",
    isChecked: true,
    commonFeaturesOptions: [],
    extraFeaturesOptions: [],
    frontImage: null,
    leftImage: null,
    rightImage: null,
    backImage: null,
    interiorImage: null,
    dashboardImage: null,
    moreImagesList: [],
    file: null,
    percentage: 0,
    loading: false,
  };

  componentDidMount() {
    var count = 0;
    let that = this;
    if (this.props.isAuthenticated) {
      if (this.state.userRetrived.method === "google") {
        if (
          this.state.userRetrived.google.name !== null &&
          this.state.userRetrived.google.name !== ""
        ) {
          this.setState({
            sellerName: this.state.userRetrived.google.name,
          });
        }
      }

      if (this.state.userRetrived.method === "facebook") {
        if (
          this.state.userRetrived.facebook.name !== null &&
          this.state.userRetrived.facebook.name !== ""
        ) {
          this.setState({
            sellerName: this.state.userRetrived.facebook.name,
          });
        }
      }

      if (this.state.userRetrived.method === "local") {
        if (
          this.state.userRetrived.local.name !== null &&
          this.state.userRetrived.local.name !== ""
        ) {
          this.setState({
            sellerName: this.state.userRetrived.local.name,
          });
        }
      }

      if (this.state.userRetrived.phoneNumber.number !== 0) {
        this.setState({
          sellerNumber: "0" + this.state.userRetrived.phoneNumber.number,
        });
      }
    }
    window.$(function () {
      window.$(document).on("change", "#upload", function () {
        var uploadFile = window.$(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (files[0].size <= 4194304) {
          if (/^image/.test(files[0].type)) {
            // only image file
            that.setState({
              errorImages: null,
            });
            console.log("Image", files[0]);

            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function () {
              // set image data as background of div
              uploadFile
                .closest(".imgUp")
                .find(".image-area")
                .css("background-image", "url(" + this.result + ")");
            };
          }
        } else {
          var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
          if (files[0].size === 0) return "0 Byte";
          var i = parseInt(
            Math.floor(Math.log(files[0].size) / Math.log(1024))
          );
          const fileSize =
            Math.round(files[0].size / Math.pow(1024, i), 2) + " " + sizes[i];
          alert(
            "Max 4 MB of file size can be uploaded. Your file size is " +
              fileSize
          );
          return;
        }
      });
    });

    window.$(function () {
      const moreImagesList = [...that.state.moreImagesList];
      var value = null;
      window.$(document).on("change", "#uploadmore", function () {
        var uploadFile = window.$(this);
        var files = !!this.files ? this.files : [];
        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support

        if (files[0].size <= 4194304) {
          if (/^image/.test(files[0].type)) {
            // only image file
            that.setState({
              errorImages: null,
            });
            console.log("Image", files[0]);

            value = files[0];
            //const index = moreImagesList.findIndex(image => image === value);
            if (moreImagesList.length >= 6) {
              moreImagesList.splice(-1);
            }
            moreImagesList.push(value);

            // sort the array
            moreImagesList.sort();
            // update the state with the new array of options
            that.setState({
              moreImagesList: moreImagesList,
            });

            var reader = new FileReader(); // instance of the FileReader
            reader.readAsDataURL(files[0]); // read the local file

            reader.onloadend = function () {
              // set image data as background of div
              //alert(uploadFile.closest(".upimage").find('.imagePreview').length);
              uploadFile
                .closest(".imgUp")
                .find(".image-area")
                .css("background-image", "url(" + this.result + ")");
            };
          }
        } else {
          that.setState({
            errorImages: "Image file is too large",
          });
          return;
        }
      });

      window.$(".imgAdd").click(function () {
        if (count < 6) {
          window
            .$(this)
            .closest(".imageUploadView")
            .find(".imgAdd")
            .before(
              '<div class="col col-md-3 imgUp"><div id="front" class="image-area"></div><a class="btn btn-danger del button_remove">Remove</a><label class="btn btn-custom btn-block text-dark text-centre font-weight-bold">Add Image <input id="uploadmore" type="file" style="width:0px;height:0px;overflow:hidden; onChange={that.moreImageChange}"/></label></div>'
            );
          count++;
        }
      });

      window.$(document).on("click", "a.del", function () {
        window.$(this).parent().remove();
      });
    });
  }

  submitHandler = async (event) => {
    event.preventDefault();

    if (
      this.state.make == null ||
      this.state.model == null ||
      this.state.year == null ||
      this.state.body == null ||
      this.state.condition == null ||
      this.state.transmission == null ||
      this.state.duty == null ||
      this.state.fuel == null ||
      this.state.interior == null ||
      this.state.color == null ||
      this.state.location == null
    ) {
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.price == null) {
      this.setState({
        errorPrice: "Car Price Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.mileage == null) {
      this.setState({
        errorMileage: "Car Mileage Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.engineSize == null) {
      this.setState({
        errorEngineSize: "Car Engine Size Required",
      });
      window.$(window).scrollTop(0);
      return;
    }

    if (this.state.description == null || this.state.description.length < 30) {
      this.setState({ errorDescription: "Car Description Required" });
      window.$(window).scrollTop(0);
      return;
    }

    if (
      this.state.frontImage == null ||
      this.state.leftImage == null ||
      this.state.rightImage == null ||
      this.state.backImage == null ||
      this.state.interiorImage == null ||
      this.state.dashboardImage == null
    ) {
      this.setState({
        errorImages:
          "Front | Left | Right | Back | Interior | Dashboard | Images are Required",
      });
      return;
    }

    if (this.state.sellerName === null || Number(this.state.sellerName)) {
      this.setState({
        sellerNameError: "Name is Required",
      });
      return;
    }

    if (
      this.state.sellerNumber == null ||
      !this.state.sellerNumber.match(phoneno) ||
      !Number(this.state.sellerNumber)
    ) {
      this.setState({
        sellerPhoneError: "Valid Number is Required",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    const params = JSON.stringify({
      name: this.state.make.concat(" ", this.state.model, " ", this.state.year),
      make: this.state.make,
      model: this.state.model,
      year: this.state.year,
      body: this.state.body,
      condition: this.state.condition,
      transmission: this.state.transmission,
      duty: this.state.duty,
      fuel: this.state.fuel,
      interior: this.state.interior,
      color: this.state.color,
      location: this.state.location,
      features: this.state.commonFeaturesOptions,
      price: parseFloat(this.state.price),
      priceNegotiable: this.state.priceIsNegotiable,
      mileage: parseFloat(this.state.mileage),
      engineSize: parseFloat(this.state.engineSize),
      description: this.state.description,
    });

    if (this.props.isAuthenticated) {
      const phoneNumberToUpdate = JSON.stringify({
        number: this.state.sellerNumber,
      });
      await this.props.updatePhoneNumber(
        this.state.userRetrived.id,
        JSON.parse(phoneNumberToUpdate)
      );

      //Post Car Details
      await this.props.postCar(this.state.userRetrived.id, JSON.parse(params));
      console.log(this.props.carObject);
      this.setState({
        carObject: this.props.carObject,
      });

      console.log(this.props.message)

      if (this.props.message === "Uploaded Successfuly") {
        const imagesData = new FormData();
        console.log("Hahaa looks good", this.props.message);
        imagesData.append("photos", this.state.frontImage);
        imagesData.append("photos", this.state.leftImage);
        imagesData.append("photos", this.state.rightImage);
        imagesData.append("photos", this.state.backImage);
        imagesData.append("photos", this.state.interiorImage);
        imagesData.append("photos", this.state.dashboardImage);
        for (const file of this.state.moreImagesList) {
          imagesData.append("photos", file);
        }
        await this.props.postCarImages(
          this.state.carObject._id,
          imagesData,
          (progressEvent) => {
            const percentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
            this.setState({ percentage: percentage });
            return percentage; // Because you were returning the percentage before.
          }
        );

        if (
          this.props.message ==="Car Details and Images uploaded successfuly"
        ) {
          this.props.history.push(`/marketcar/${this.state.carObject._id}`);
        }
      }
    }
  };

  handleCarMake = (make, error) => {
    this.setState({ make: make, MakeError: error });
  };

  handleCarModel = (model, error) => {
    this.setState({ model: model, modelError: error });
  };

  handleCarYear = (year, error) => {
    this.setState({ year: year, yearError: error });
  };

  handleCarBody = (body, error) => {
    this.setState({ body: body, bodyError: error });
  };

  handleCarCondition = (condition, error) => {
    this.setState({ condition: condition, conditionError: error });
  };

  handleCarTransmission = (transmission, error) => {
    this.setState({ transmission: transmission, transmissionError: error });
  };

  handleCarDuty = (duty, error) => {
    this.setState({ duty: duty, dutyError: error });
  };

  handleCarfuel = (fuel, error) => {
    this.setState({ fuel: fuel, fuelError: error });
  };

  handleCarInterior = (interior, error) => {
    this.setState({ interior: interior, interiorError: error });
  };

  handleCarColor = (color, error) => {
    this.setState({ color: color, colorError: error });
  };

  handleCarLocation = (location, error) => {
    this.setState({ location: location, locationError: error });
  };

  toggleChangeCommonFeatures = (event) => {
    const commonFeaturesOptions = [...this.state.commonFeaturesOptions];

    const value = event.target.value;
    const index = commonFeaturesOptions.findIndex(
      (feature) => feature === value
    );

    if (index > -1) {
      commonFeaturesOptions.splice(index, 1);
    } else {
      commonFeaturesOptions.push(value);
    }

    // sort the array
    commonFeaturesOptions.sort();
    // update the state with the new array of options
    this.setState({
      commonFeaturesOptions: commonFeaturesOptions,
    });
  };

  toggleChangeExtraFeatures = (event) => {
    const extraFeaturesOptions = this.state.commonFeaturesOptions;
    const value = event.target.value;
    const index = extraFeaturesOptions.findIndex(
      (feature) => feature === value
    );

    if (index > -1) {
      extraFeaturesOptions.splice(index, 1);
    } else {
      extraFeaturesOptions.push(value);
    }
    // sort the array
    extraFeaturesOptions.sort();
    // update the state with the new array of options
    this.setState({
      commonFeaturesOptions: extraFeaturesOptions,
    });
  };

  toggleChangePriceNegotiable = (event) => {
    if (event.target.cheked) {
      this.setState({
        priceIsNegotiable: true,
      });
    } else {
      this.setState({
        priceIsNegotiable: false,
      });
    }
  };

  frontImageChange = (event) => {
    this.setState({
      frontImage: event.target.files[0],
    });
  };
  leftImageChange = (event) => {
    this.setState({
      leftImage: event.target.files[0],
    });
  };
  rightImageChange = (event) => {
    this.setState({
      rightImage: event.target.files[0],
    });
  };
  backImageChange = (event) => {
    this.setState({
      backImage: event.target.files[0],
    });
  };
  interiorImageChange = (event) => {
    this.setState({
      interiorImage: event.target.files[0],
    });
  };
  dashboardImageChange = (event) => {
    this.setState({
      dashboardImage: event.target.files[0],
    });
  };
  moreImageChange = () => {
    this.setState({});
  };

  priceChangeHandler = (event) => {
    this.setState({
      price: event.target.value.replace(/,/g, ""),
      errorPrice: null,
    });
  };
  mileageChangeHandler = (event) => {
    this.setState({
      mileage: event.target.value.replace(/,/g, ""),
      errorMileage: null,
    });
  };

  engineSizeChangeHandler = (event) => {
    this.setState({
      engineSize: event.target.value.replace(/,/g, ""),
      errorEngineSize: null,
    });
  };

  decriptionChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    //Values
    this.setState({ [nam]: val });
  };

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let phoneNumberErr = "";
    if (nam === "sellerNumber") {
      if (val.match(phoneno) && Number(val)) {
        phoneNumberErr = null;
      } else {
        phoneNumberErr = "Valid Phone Number Required";
      }
    }

    this.setState({
      sellerPhoneError: phoneNumberErr,
    });

    let nameErr = "";
    if (nam === "sellerName") {
      if (!Number(val)) {
        nameErr = null;
      } else {
        nameErr = "Valid Name Required";
      }
    }

    this.setState({
      sellerNameError: nameErr,
    });

    let errDescription = "";
    if (nam === "description") {
      if (val.length < 50) {
        errDescription = "Should be more than 30 Characters";
      }
    }

    this.setState({
      errorDescription: errDescription,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };
  render() {
    const mystyle = { marginTop: "70px" };
    const uploadstyle = { width: "0px", height: " 0px", overflow: "hidden" };
    const iconsStyle = {
      color: "#00544C",
      marginRight: "10px",
      colorHover: "#009688",
    };
    const selectorStyle = {
      backgroundColor: "#00bfa5",
      color: "#fff",
      margin: "10px",
    };
    const errorText = { fontSize: "12px", margin: "0px", Padding: "0px" };

    return (
      <div className="sell-car">
        <div className="container" style={mystyle}>
          <div className="row">
            <div className="col-md-9">
              <div>
                <div>
                  <h4 className="font-weight-bold">Car Details</h4>
                  <FilterSellcarComponent
                    handleCarMake={this.handleCarMake.bind(this)}
                    handleCarModel={this.handleCarModel.bind(this)}
                    handleCarYear={this.handleCarYear.bind(this)}
                    handleCarBody={this.handleCarBody.bind(this)}
                    handleCarCondition={this.handleCarCondition.bind(this)}
                    handleCarTransmission={this.handleCarTransmission.bind(
                      this
                    )}
                    handleCarFuel={this.handleCarfuel.bind(this)}
                    handleCarDuty={this.handleCarDuty.bind(this)}
                    handleCarInterior={this.handleCarInterior.bind(this)}
                    handleCarColor={this.handleCarColor.bind(this)}
                    handleCarLocation={this.handleCarLocation.bind(this)}
                  />
                  <form id="car-details" onSubmit={this.submitHandler}>
                    <div
                      className="rounded mx-auto shadow-lg"
                      style={selectorStyle}
                    >
                      <div className="form-row" style={{ padding: "15px" }}>
                        <div className="col">
                          <p>Price (Ksh)*</p>
                          <NumberFormat
                            thousandSeparator={true}
                            className="form-control text-dark"
                            placeholder="Enter Price"
                            name="price"
                            onChange={this.priceChangeHandler}
                            inputMode="numeric"
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.errorPrice}
                          </p>
                        </div>

                        <div className="col">
                          <p>Mileage (Km)*</p>
                          <NumberFormat
                            thousandSeparator={true}
                            className="form-control text-dark"
                            placeholder="Enter Mileage"
                            name="mileage"
                            onChange={this.mileageChangeHandler}
                            inputMode="numeric"
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.errorMileage}
                          </p>
                        </div>

                        <div className="col">
                          <p>Engine Size (CC)*</p>
                          <NumberFormat
                            thousandSeparator={true}
                            className="form-control text-dark"
                            placeholder="Enter Engine Size"
                            name="engineSize"
                            onChange={this.engineSizeChangeHandler}
                            inputMode="numeric"
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.errorEngineSize}
                          </p>
                        </div>

                        <div
                          className="col-md-12"
                          style={{ marginTop: "10px" }}
                        >
                          <p>Enter Description *</p>
                          <textarea
                            rows="4"
                            minLength="50"
                            className="form-control text-dark"
                            type="text"
                            placeholder="Enter Car Description"
                            name="description"
                            onChange={this.changeHandler}
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.errorDescription}
                          </p>
                        </div>
                        <div
                          className="custom-control custom-checkbox"
                          style={{ marginTop: "20px" }}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="priceIsNegotiable"
                            onChange={this.toggleChangePriceNegotiable}
                            defaultChecked={true}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="priceIsNegotiable"
                          >
                            Price Is Negotiable
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>

                  <div
                    className="rounded mx-auto shadow-lg"
                    style={selectorStyle}
                  >
                    <div className="p-3">
                      <h5 className="h6 font-weight-bold">Common Features</h5>
                      <div className="container">
                        <div className="row">
                          {commonFeatures.map((common) => (
                            <li
                              key={common.value}
                              className="list-group-item flex-fill rounded-5"
                            >
                              <div className="custom-control custom-checkbox">
                                <input
                                  id={common.label}
                                  className="custom-control-input"
                                  type="checkbox"
                                  value={common.label}
                                  name={common.label}
                                  defaultChecked={false}
                                  onChange={this.toggleChangeCommonFeatures.bind(
                                    this
                                  )}
                                />
                                <label
                                  className="text-dark cursor-pointer d-block custom-control-label"
                                  htmlFor={common.label}
                                >
                                  {common.label}
                                </label>
                              </div>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded mx-auto shadow-lg"
                    style={selectorStyle}
                  >
                    <div className="p-3">
                      <h5 className="h6 font-weight-bold">Extra Features</h5>
                      <div className="container">
                        <div className="row">
                          {extraFeatures.map((extra) => (
                            <li
                              key={extra.value}
                              className="list-group-item flex-fill rounded-5"
                            >
                              <div className="custom-control custom-checkbox">
                                <input
                                  id={extra.label}
                                  className="custom-control-input"
                                  type="checkbox"
                                  value={extra.label}
                                  name={extra.label}
                                  defaultChecked={false}
                                  onChange={this.toggleChangeExtraFeatures.bind(
                                    this
                                  )}
                                />
                                <label
                                  className="text-dark cursor-pointer d-block custom-control-label"
                                  htmlFor={extra.label}
                                >
                                  {extra.label}
                                </label>
                              </div>
                            </li>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="rounded mx-auto shadow border-0 font-weight-bold"
                    style={selectorStyle}
                  >
                    <div className="row p-3 imageUploadView">
                      <div className="col col-md-3 imgUp">
                        <div id="front" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Front
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.frontImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>
                      <div className="col col-md-3 imgUp">
                        <div id="left" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Left Side
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.leftImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>

                      <div className="col col-md-3 imgUp">
                        <div id="right" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Right Side
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.rightImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>

                      <div className="col col-md-3 imgUp">
                        <div id="back" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Back
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.backImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>

                      <div className="col col-md-3 imgUp">
                        <div id="dashboard" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Dashboard
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.dashboardImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>

                      <div className="col col-md-3 imgUp">
                        <div id="interior" className="image-area" />
                        <label className="btn btn-custom btn-block text-dark text-centre font-weight-bold">
                          <FontAwesomeIcon
                            icon="plus-circle"
                            style={iconsStyle}
                          />
                          Interior
                          <input
                            id="upload"
                            type="file"
                            style={uploadstyle}
                            onChange={this.interiorImageChange}
                          />
                          <i className="fa fa-times del"></i>
                        </label>
                      </div>

                      <label className="mx-auto btn btn-add btn-block text-dark font-weight-bold imgAdd">
                        <FontAwesomeIcon
                          icon="plus-circle"
                          style={iconsStyle}
                        />{" "}
                        Add More Images
                      </label>
                    </div>
                  </div>
                  <p className="text-danger" style={errorText}>
                    {this.state.errorImages}
                  </p>

                  <form id="car-details" onSubmit={this.submitHandler}>
                    <h5 className="h6 font-weight-bold">Contact Details</h5>
                    <div
                      className="rounded mx-auto shadow-lg"
                      style={selectorStyle}
                    >
                      <div className="form-row" style={{ padding: "15px" }}>
                        <div className="col col-md-6 text-dark text-centre">
                          <p>Name *</p>
                          <input
                            rows="4"
                            minLength="50"
                            className="form-control text-dark"
                            type="text"
                            placeholder={this.state.sellerName}
                            onChange={this.changeHandler}
                            name="sellerName"
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.sellerNameError}
                          </p>
                        </div>

                        <div className="col col-md-6 text-dark text-centre">
                          <p>Phone Number *</p>
                          <input
                            className="form-control text-dark"
                            placeholder={this.state.sellerNumber}
                            name="sellerNumber"
                            onChange={this.changeHandler}
                            type="text"
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.sellerPhoneError}
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                  {this.state.loading ? <Spinner /> : null}
                  <Progress percentage={this.state.percentage} />
                  <button
                    id="submitButton"
                    form="car-details"
                    type="submit"
                    className="mx-auto btn btn-custom btn-block text-dark text-centre font-weight-bold"
                  >
                    <FontAwesomeIcon icon="upload" style={iconsStyle} />
                    Post Car
                  </button>
                </div>
              </div>
            </div>
            <aside className="col-md-3 blog-sidebar">
              <div className="p-2 mb-2 bg-dark text-light rounded">
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
    message: state.postCar.message,
    isAuthenticated: state.auth.isAuthenticated,
    carObject: state.postCar.carObject,
    phoneUpdateMessage: state.auth.message,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "sellCar" })
)(SellcarComponent);
