import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import * as actions from "../actions";

class Header extends Component {
  state = {
    sellerName: null,
    userObject: null,
  };

  signOut = () => {
    this.props.signOut();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
      let userObject = this.props.userObject;
      if (this.props.isAuthenticated) {
        if (
          this.props.userObject !== null ||
          this.props.userObject !== undefined
        ) {
          if (userObject !== null || userObject !== undefined) {
            switch (userObject.method) {
              case "google":
                this.setState({
                  sellerName: userObject.google.name,
                });
                break;
              case "facebook":
                this.setState({
                  sellerName: userObject.facebook.name,
                });
                break;
              case "local":
                this.setState({
                  sellerName: userObject.local.name,
                });
                break;
              default:
                this.setState({
                  sellerName: "Hallo",
                });
            }
          }
          this.setState({
            userObject: userObject,
          });
          console.log("Object", this.state.userObject);
        }
      }
    }
  }

  componentDidMount() {
    let userObject = JSON.parse(localStorage.getItem("UserObject"));
    if (this.props.isAuthenticated) {
      if (
        this.props.userObject !== null ||
        this.props.userObject !== undefined
      ) {
        if (userObject !== null || userObject !== undefined) {
          switch (userObject.method) {
            case "google":
              this.setState({
                sellerName: userObject.google.name,
              });
              break;
            case "facebook":
              this.setState({
                sellerName: userObject.facebook.name,
              });
              break;
            case "local":
              this.setState({
                sellerName: userObject.local.name,
              });
              break;
            default:
              this.setState({
                sellerName: "Hallo",
              });
          }
        }
        this.setState({
          userObject: userObject,
        });
      }
    }
  }

  render() {
    const mystyle = {
      backgroundColor: "#00bfa5",
      marginBottom: "50px",
    };
    return (
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-dark"
        style={mystyle}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img alt="Clock" src={require("../assets/svgs/sport-car.svg")} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <ul className="nav navbar- ml-auto">
              {this.props.isAuthenticated ? (
                <li className="nav-item text-center">
                  <Link
                    className="btn btn-sellcar btn-block font-weight-bold text-light rounded-circular shadow border-1"
                    to="/sellcar"
                    role="button"
                    style={{ marginTop: "5px" }}
                  >
                    Sell A Car
                  </Link>
                </li>
              ) : (
                <li className="nav-item text-center">
                  <Link
                    className="btn btn-sellcar btn-block font-weight-bold text-light shadow border-1"
                    to="/signin"
                    role="button"
                    style={{ marginTop: "5px" }}
                  >
                    Sell A Car
                  </Link>
                </li>
              )}
              {this.props.isAuthenticated ? (
                <div className="btn-group">
                  <Link
                    className="nav-link font-weight-bold text-light dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    to="/dashboard"
                  >
                    Hi,{this.state.sellerName}
                  </Link>

                  <div className="dropdown-menu">
                    <Link className="dropdown-item text-success" to="/dashboard">
                    <FontAwesomeIcon icon="list" className="font-weight-bold"/> Adverts
                    </Link>
                    <Link className="dropdown-item text-info" to="/userprofile">
                    <FontAwesomeIcon icon="user" className="font-weight-bold"/> Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link
                      className="dropdown-item text-danger"
                      to="/"
                      onClick={this.signOut.bind(this)}
                    >
                      <FontAwesomeIcon icon="sign-out-alt" className="font-weight-bold color-warning"/> Logout
                    </Link>
                  </div>
                </div>
              ) : null}
              {!this.props.isAuthenticated
                ? [
                    <li className="nav-item text-center" key="signup">
                      <Link
                        className="nav-link text-light"
                        to="/signup"
                      >
                        Register
                      </Link>
                    </li>,
                    <li className="nav-item text-center" key="signin">
                      <Link
                        className="nav-link text-light"
                        to="/signin"
                      >
                        Login
                      </Link>
                    </li>,
                  ]
                : null}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userObject: state.auth.userObject,
  };
}

export default connect(mapStateToProps, actions)(Header);
