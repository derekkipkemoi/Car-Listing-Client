import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import GoogleLogin from "react-google-login";
import FaceboookLogin from "react-facebook-login";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";
import * as actions from "../actions";
var phoneno = /^\d{10}$/;
var name = /^[a-zA-Z]+$/;
var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

class SignUp extends Component {
  state = {
    type: "input",
    score: "null",
    firstName: null,
    firstNameError: null,
    lastName: null,
    lastNameError: null,
    phoneNumber: null,
    phoneError: null,
    email: null,
    emailError: null,
    password: null,
    passwordError: null,
    loading: false,
  };

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  }

  passwordStrength(e) {
    if (e.target.value === "") {
      this.setState({
        score: "null",
      });
    } else {
      var pw = e.target.value;
      this.setState({
        score: pw.score,
      });
    }
  }

  changeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;

    let phoneNumberErr = "";
    if (nam === "number") {
      if (val.match(phoneno) && Number(val)) {
        phoneNumberErr = null;
      } else {
        phoneNumberErr = "Valid Phone Number Required";
      }
    }

    this.setState({
      phoneError: phoneNumberErr,
    });

    let firstNameErr = "";
    if (nam === "firstName") {
      if (val.match(name)) {
        firstNameErr = null;
      } else {
        firstNameErr = "Valid Name Required";
      }
    }
    this.setState({
      firstNameError: firstNameErr,
    });

    let lastNameErr = "";
    if (nam === "lastName") {
      if (val.match(name)) {
        lastNameErr = null;
      } else {
        lastNameErr = "Valid Name Required";
      }
    }
    this.setState({
      lastNameError: lastNameErr,
    });

    let emailErr = "";
    if (nam === "email") {
      if (val.match(email)) {
        emailErr = null;
      } else {
        emailErr = "Valid Email Required";
      }
    }
    this.setState({
      emailError: emailErr,
    });

    let passwordErr = "";
    if (nam === "password") {
      if (val.length >= 6) {
        passwordErr = null;
      } else {
        passwordErr = "Your password must be minimum 6 characters";
      }
    }
    this.setState({
      passwordError: passwordErr,
    });

    //Values
    this.setState({
      [nam]: val,
    });
  };

  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.firstName === null || !this.state.firstName.match(name)) {
      this.setState({
        firstNameError: "Valid Name Required",
      });
      return;
    }

    if (this.state.lastName === null || !this.state.lastName.match(name)) {
      this.setState({
        lastNameError: "Valid Name Required",
      });
      return;
    }

    if (this.state.email === null || !this.state.email.match(email)) {
      this.setState({
        emailError: "Valid Email Required",
      });
      return;
    }

    if (this.state.password === null || this.state.password.length < 6) {
      this.setState({
        passwordError: "Your password must be minimum 6 characters",
      });
      return;
    }

    this.setState({
      loading: true,
    });
    const params = JSON.parse(
      JSON.stringify({
        email: this.state.email,
        name: this.state.firstName.concat(" ", this.state.lastName),
        password: this.state.password,
      })
    );

    console.log(params);
    await this.props.signUp(params);
    this.setState({
      loading: false,
    });
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  responseGoogle = async (res) => {
    await this.props.oauthGoogle(res.accessToken);
    if (!this.props.message) {
      this.props.history.push("/dashboard");
    }
  };

  responseFacebook = async (res) => {
    await this.props.oauthFacebook(res.accessToken);
    if (!this.props.message) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    const mystyle = {
      marginTop: "70px",
    };
    return (
      <div className="container" style={mystyle}>
        <div
          className="card rounded mx-auto shadow border-1"
          //style={{ backgroundColor: "#00bfa5" }}
        >
          <div className="card-body">
            <div style={{ marginTop: "25px" }}>
              <h3 className="text-dark font-weight-bold">Register</h3>
            </div>
            <div className="row border-1">
              <div
                className="col-md-5 border rounded mx-auto shadow border-0 bg-light"
                style={{ padding: "20px", margin: "20px" }}
              >
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter First Name"
                      onChange={this.changeHandler}
                    />
                    <small className="text-danger">
                      {this.state.firstNameError}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="LsstName">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      id="lastName"
                      placeholder="Enter Last Name"
                      onChange={this.changeHandler}
                    />
                    <small className="text-danger">
                      {this.state.lastNameError}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Email address *
                    </label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      onChange={this.changeHandler}
                    />
                    <small className="text-danger">
                      {this.state.emailError}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="LlstName">Password</label>
                    <input
                      type={this.state.type}
                      name="password"
                      className="password__input form-control"
                      onChange={this.changeHandler}
                      id="password"
                      placeholder="Enter Password"
                    />
                    <small className="text-danger">
                      {this.state.passwordError}
                    </small>
                  </div>

                  <label className="password">
                    <button
                      className="password__show btn btn-secondary"
                      onClick={this.showHide.bind(this)}
                      style={{ marginTop: "10px" }}
                    >
                      {this.state.type === "input"
                        ? "Hide Password"
                        : "Show Password"}
                    </button>
                  </label>

                  {this.props.message === "User Registered Successfully" ? (
                    <div className="alert alert-success">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.props.message ===
                  "User with " + this.state.email + " already exists!" ? (
                    <div className="alert alert-danger">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.state.loading ? <Spinner /> : null}

                  <button
                    className="btn btn-custom btn-block text-info"
                    type="submit"
                    style={{ marginTop: "20px" }}
                  >
                    Register
                  </button>

                  <small className="text-center">
                    <Link to={`/signin`} class="text-secondary">
                      Already Registerd? LogIn
                    </Link>
                  </small>
                </form>
              </div>

              <div
                className="col-md-5 border rounded mx-auto shadow border-0 bg-light"
                style={{ padding: "20px", margin: "20px" }}
              >
                <div className="text-centre">
                  <div
                    className="font-weight-bold"
                    style={{ marginTop: "100px" }}
                  ></div>
                  <FaceboookLogin
                    appId="296519711567547"
                    autoLoad={false}
                    textButton="Register With Facebook"
                    field="name,email,picture"
                    callback={this.responseFacebook}
                    cssClass="font-weight-bold btn btn-block btn-primary"
                  />
                </div>
                <div
                  className="font-weight-bold text-center"
                  style={{ marginTop: "25px" }}
                >
                  <p>OR</p>
                </div>

                <GoogleLogin
                  clientId="725221803087-0udcvqrcksv7gkrfgqcgieodia4m1bgp.apps.googleusercontent.com"
                  render={(renderProps) => (
                    <button
                      className="font-weight-bold btn btn-block btn-danger"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Register With Google
                    </button>
                  )}
                  buttonText="Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cssClass="btn btn-outline-primary"
                />
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
    message: state.auth.message,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signup" })
)(SignUp);
