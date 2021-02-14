import React, { Component } from "react";
import { reduxForm} from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

import * as actions from "../actions";
import Spinner from "./Spinner";
var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

class RequestPasswordReset extends Component {
  state = {
    type: "input",
    score: "null",
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
    //Values
    this.setState({
      [nam]: val,
    });
  };
  onSubmit = async (event) => {
    event.preventDefault();

    if (this.state.email === null || !this.state.email.match(email)) {
      this.setState({
        emailError: "Valid Email Required",
      });
      return;
    }

    this.setState({
      loading: true,
    });

    await this.props.requestPasswordReset(this.state.email);
    this.setState({
      loading: false,
    });
  };
  render() {
    const mystyle = {
      marginTop: "70px",
    };
    return (
      <div className="container" style={mystyle}>
        <div
          className="card rounded mx-auto shadow border-1"
          style={{ backgroundColor: "#00bfa5" }}
        >
          <div className="card-body">
            <div className="font-weight-bold" style={{ marginTop: "25px" }}>
              <p className="text-light text-center">
                Enter Your Registered Email To Receive Password Reset Link
              </p>
            </div>
            <div className="row border-1">
              <div
                className="col-md-5 border rounded mx-auto shadow border-0 bg-light"
                style={{ padding: "20px", margin: "20px" }}
              >
                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Enter Your Registered Email *
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

                  {this.props.message ===
                  "User With this email does not exist. Please Use the Email you Registered with" ? (
                    <div className="alert alert-danger">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.props.message ===
                  "Password reset link has been sent to "+this.state.email+" please use it to reset your password" ? (
                    <div className="alert alert-success">
                      <small>{this.props.message}</small>
                    </div>
                  ) : null}

                  {this.state.loading ? <Spinner /> : null}

                  {this.props.message === "Password reset link has been sent to "+this.state.email+" please use it to reset your password" ? (
                    <Link
                      className="btn btn-custom btn-block text-light"
                      to={`/`}
                      type="submit"
                      style={{ marginTop: "20px" }}
                    >
                      Continue
                    </Link>
                  ) : (
                    <button
                      className="btn btn-custom btn-block text-light"
                      type="submit"
                      style={{ marginTop: "20px" }}
                    >
                      Request Password Reset Link
                    </button>
                  )}
                  <small className="text-center">
                    <Link to={`/signin`} class="text-secondary">
                      Login
                    </Link>
                  </small>
                </form>
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
    message: state.auth.message,
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "requestPasswordReset" })
)(RequestPasswordReset);
