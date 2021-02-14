import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

var phoneno = /^\d{10}$/;
var name = /^[a-zA-Z]+$/;

class UserProfile extends Component {
  state = {
    sellerId: null,
    userObject: JSON.parse(localStorage.getItem("UserObject")),

    loading: false,
    userId: null,
    phoneNumber: "",
    number: null,
    userName: null,
    userEditName: "",
    userEditPhone: "",
    firstName: null,
    lastName: null,
    userEmail: null,
    sellerJoinedAt: 0,
    cars: [],

    sellerEmailError: null,
    sellerNumberError: null,
    sellerFirstNameError: null,
    selleLastNameError: null,
    message: null,
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.userObject !== this.props.userObject) {
      if (this.props.isAuthenticated) {
        this.setState({
          loading: true,
          userObject: JSON.parse(localStorage.getItem("UserObject")),
        });
        //await this.props.getUser(this.state.userObject.id);
        var dateString = this.props.userObject.createdAt;
        dateString = new Date(dateString).toUTCString();
        dateString = dateString.split(" ").slice(0, 4).join(" ");
        if (this.props.userObject.method === "google") {
          this.setState({
            cars: this.props.userObject.cars,
            userObject: this.props.userObject,
            loading: false,
            userId: this.props.userObject._id,
            number: "0" + this.props.userObject.phoneNumber.number,
            sellerJoinedAt: dateString,
            userName: this.props.userObject.google.name,
            firstName: this.props.userObject.google.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.google.name
              .split(" ")
              .slice(-1)
              .join(" "),
            userEmail: this.props.userObject.google.email,
            profilePicture: this.props.userObject.google.picture,
          });
        }

        if (this.props.userObject.method === "facebook") {
          this.setState({
            cars: this.props.userObject.cars,
            userId: this.props.userObject._id,
            userObject: this.props.userObject,
            loading: false,
            number: "0" + this.props.userObject.phoneNumber.number,
            userEmail: this.props.userObject.facebook.email,
            sellerJoinedAt: dateString,
            userName: this.props.userObject.facebook.name,
            firstName: this.props.userObject.facebook.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.facebook.name
              .split(" ")
              .slice(-1)
              .join(" "),
            profilePicture: this.props.userObject.facebook.picture,
          });
        }

        if (this.props.userObject.method === "local") {
          this.setState({
            cars: this.props.userObject.cars,
            userObject: this.props.userObject,
            userId: this.props.userObject._id,
            loading: false,
            number: "0" + this.props.userObject.phoneNumber.number,
            userEmail: this.props.userObject.local.email,
            sellerJoinedAt: dateString,
            userName: this.props.userObject.local.name,
            firstName: this.props.userObject.local.name
              .split(" ")
              .slice(0, -1)
              .join(" "),
            lastName: this.props.userObject.local.name
              .split(" ")
              .slice(-1)
              .join(" "),
            profilePicture: this.props.userObject.local.picture,
          });
        }
      }
    }
  };

  componentDidMount = async () => {
    if (this.props.isAuthenticated) {
      this.setState({
        loading: true,
        userObject: JSON.parse(localStorage.getItem("UserObject")),
      });
      await this.props.getUser(this.state.userObject.id);
      var dateString = this.props.userObject.createdAt;
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(" ").slice(0, 4).join(" ");
      if (this.props.userObject.method === "google") {
        this.setState({
          cars: this.props.userObject.cars,
          userObject: this.props.userObject,
          loading: false,
          userId: this.props.userObject._id,
          number: "0" + this.props.userObject.phoneNumber.number,
          sellerJoinedAt: dateString,
          userName: this.props.userObject.google.name,
          firstName: this.props.userObject.google.name
            .split(" ")
            .slice(0, -1)
            .join(" "),
          lastName: this.props.userObject.google.name
            .split(" ")
            .slice(-1)
            .join(" "),
          userEmail: this.props.userObject.google.email,
          profilePicture: this.props.userObject.google.picture,
        });
      }

      if (this.props.userObject.method === "facebook") {
        this.setState({
          cars: this.props.userObject.cars,
          userId: this.props.userObject._id,
          userObject: this.props.userObject,
          loading: false,
          number: "0" + this.props.userObject.phoneNumber.number,
          sellerJoinedAt: dateString,
          userName: this.props.userObject.facebook.name,
          userEmail: this.props.userObject.facebook.email,
          profilePicture: this.props.userObject.facebook.picture,
        });
      }

      if (this.props.userObject.method === "local") {
        this.setState({
          cars: this.props.userObject.cars,
          userObject: this.props.userObject,
          userId: this.props.userObject._id,
          loading: false,
          number: "0" + this.props.userObject.phoneNumber.number,
          sellerJoinedAt: dateString,
          userName: this.props.userObject.local.name,
          firstName: this.props.userObject.local.name
            .split(" ")
            .slice(0, -1)
            .join(" "),
          lastName: this.props.userObject.local.name
            .split(" ")
            .slice(-1)
            .join(" "),
          userEmail: this.props.userObject.local.email,
          profilePicture: this.props.userObject.local.picture,
        });
      }
    }
  };

  updateUserPhone = async () => {
    if (!this.state.userEditPhone.match(phoneno)) {
      console.log("Valid Phone Number Required", this.state.userEditPhone);
      return;
    }

    this.setState({
      sellerNumberError: "Valid Phone Number Required",
    });

    this.setState({
      loading: true,
    });

    const phoneNumberToUpdate = JSON.stringify({
      number: this.state.userEditPhone,
    });
    await this.props.updatePhoneNumber(
      this.props.userObject._id,
      JSON.parse(phoneNumberToUpdate)
    );
    this.setState({
      message: this.props.message,
      userObject: JSON.parse(localStorage.getItem("UserObject")),
      loading: false,
    });
  };

  updateUserProfile = async () => {
    if (!this.state.firstName.match(name) && !this.state.lastName.match(name)) {
      console.log("Valid Name Required", this.state.userEditName);
      this.setState({
        sellerNameError: "Valid Name Required",
      });
      return;
    }

    if (
      this.state.userName ===
      this.state.firstName + " " + this.state.lastName
    ) {
      this.setState({
        sellerNameError: "Cannnot update same name",
      });
      return;
    }
    this.setState({
      loading: true,
    });

    const updateProfile = JSON.stringify({
      name: this.state.firstName + " " + this.state.lastName,
    });
    console.log("UserId", this.props.userObject._id);
    console.log("Name", updateProfile);
    await this.props.updateUser(
      this.props.userObject._id,
      JSON.parse(updateProfile)
    );
    this.setState({
      message: this.props.message,
      userObject: JSON.parse(localStorage.getItem("UserObject")),
      loading: false,
    });
  };

  handleChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let phoneNumberErr = "";
    if (nam === "userEditPhone") {
      if (val.match(phoneno) && Number(val)) {
        phoneNumberErr = null;
      } else {
        phoneNumberErr = "Valid phone number required";
      }
    }

    this.setState({
      sellerNumberError: phoneNumberErr,
    });

    let userFirstNameErr = "";
    if (nam === "firstName") {
      if (val.match(name)) {
        userFirstNameErr = null;
      } else {
        userFirstNameErr = "Valid first name required";
      }
    }

    this.setState({
      sellerFirstNameError: userFirstNameErr,
    });

    let userLastNameErr = "";
    if (nam === "lastName") {
      if (val.match(name)) {
        userLastNameErr = null;
      } else {
        userLastNameErr = "Valid Last name required";
      }
    }

    this.setState({
      selleLastNameError: userLastNameErr,
    });
    //Values
    this.setState({
      [nam]: val,
    });
  };
  render() {
    const iconsStyle = {
      color: "color-primary",
      marginLeft: "10px",
      marginRight: "10px",
    };
    const errorText = {
      fontSize: "12px",
      margin: "0px",
      Padding: "0px",
    };
    const socialMediaIconsStyle = {
      marginTop: "10px",
    };
    return (
      <div>
        <div
          className="container"
          style={{ marginTop: "100px", marginBottom: "200px" }}
        >
          <div className="row">
            <aside className="col-md-3 blog-sidebar">
              <div className="card">
                {this.state.profilePicture === "" ? (
                  <img
                    src="https://img.icons8.com/bubbles/100/000000/user.png"
                    className="rounded-circle mx-auto d-block"
                    alt="..."
                    width="120"
                    height="120"
                    style={{ marginTop: "20px" }}
                  />
                ) : (
                  <img
                    src={this.state.profilePicture}
                    className="rounded-circle mx-auto d-block"
                    alt="..."
                    width="120"
                    height="120"
                    style={{ marginTop: "20px" }}
                  />
                )}

                <div className="card-body text-dark text-centre">
                  <h5 className="card-title text-centre font-weight-bold">
                    {this.state.userName}
                  </h5>
                </div>
                <ul className="text-dark list-group list-group-flush">
                  <li className="list-group-item font-weight-bold">
                    Joined : {this.state.sellerJoinedAt}
                  </li>
                  <li className="list-group-item font-weight-bold">
                    Total Ads : {this.state.cars.length}
                  </li>
                  <li className="list-group-item font-weight-bold">
                    <FontAwesomeIcon
                      icon="envelope"
                      style={iconsStyle}
                      className="font-weight-bold"
                    />{" "}
                    {this.state.userEmail}
                  </li>
                  <li className="list-group-item font-weight-bold">
                    <FontAwesomeIcon
                      icon="phone"
                      style={iconsStyle}
                      className="font-weight-bold"
                    />
                    {this.state.number}
                  </li>
                </ul>
                <div className="card-body">
                  <div
                    className="text-align-centre"
                    style={socialMediaIconsStyle}
                  >
                    {
                      <FacebookShareButton
                        url={"https://www.motikenya.co.ke/"}
                        quote={
                          this.state.userName +
                          "  On motikenya.co.ke.   " +
                          this.state.cars.length +
                          " Cars Listed for sale. Link: https://www.motikenya.co.ke/userList/" +
                          this.state.userId
                        }
                        hashtag="Motii!!. Top Cars Seller"
                      >
                        <FacebookIcon size={36} round={true} />
                      </FacebookShareButton>
                    }

                    {
                      <TwitterShareButton
                        title={
                          this.state.userName +
                          "  On https://www.motikenya.co.ke.   " +
                          this.state.cars.length +
                          " Cars Listed for sale Link: "
                        }
                        url={
                          "https://www.motikenya.co.ke/userList/601e3fcc8a6b05641f537c4a"
                        }
                      >
                        <TwitterIcon size={36} round={true} />
                      </TwitterShareButton>
                    }
                  </div>
                </div>
              </div>
            </aside>

            <div className="col-md-9">
              <Link to={`/dashboard`}>
                <button
                  type="button"
                  className="btn btn-outline-success btn-lg btn-block"
                >
                  <FontAwesomeIcon
                    icon="list"
                    style={iconsStyle}
                    className="font-weight-bold"
                  />
                  My Adverts
                </button>
              </Link>
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg btn-block"
                data-toggle="modal"
                data-target="#UpdateProfile"
              >
                <FontAwesomeIcon
                  icon="user"
                  style={iconsStyle}
                  className="font-weight-bold"
                />
                Personal Information
              </button>
              <button
                type="button"
                className="btn btn-outline-primary btn-lg btn-block"
                data-toggle="modal"
                data-target="#UpdatePhone"
              >
                <FontAwesomeIcon
                  icon="phone"
                  style={iconsStyle}
                  className="font-weight-bold"
                />{" "}
                Phone Number
              </button>
              <Link to={`/contactUs`}>
                <button
                  type="button"
                  className="btn btn-outline-info btn-lg btn-block"
                >
                  <FontAwesomeIcon
                    icon="at"
                    style={iconsStyle}
                    className="font-weight-bold"
                  />
                  Contact Us
                </button>
              </Link>

              <div
                className="modal fade"
                id="UpdatePhone"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        <FontAwesomeIcon
                          icon="phone"
                          style={iconsStyle}
                          className="font-weight-bold"
                        />
                        Phone Number
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
                          <p>Phone Number *</p>
                          <input
                            type="text"
                            className="form-control"
                            name="userEditPhone"
                            placeholder={this.state.number}
                            id="recipient-name"
                            onChange={this.handleChange}
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.sellerNumberError}
                          </p>
                          {this.state.loading ? <Spinner /> : null}
                          <p className="text-success">{this.state.message}</p>
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
                        className="btn btn-outline-success"
                        onClick={this.updateUserPhone.bind(this)}
                      >
                        Update Phone Number
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id="UpdateProfile"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        <FontAwesomeIcon
                          icon="user"
                          style={iconsStyle}
                          className="font-weight-bold"
                        />
                        Personal Information
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
                          <p>First Name*</p>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            placeholder={this.state.firstName}
                            id="recipient-name"
                            onChange={this.handleChange}
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.sellerFirstNameError}
                          </p>
                        </div>

                        <div className="form-group">
                          <p>Last Name*</p>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            placeholder={this.state.lastName}
                            id="recipient-name"
                            onChange={this.handleChange}
                          />
                          <p className="text-danger" style={errorText}>
                            {this.state.selleLastNameError}
                          </p>
                          {this.state.loading ? <Spinner /> : null}
                          <p className="text-success">{this.state.message}</p>
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
                        className="btn btn-outline-success"
                        onClick={this.updateUserProfile.bind(this)}
                      >
                        Update Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, actions)(UserProfile);
