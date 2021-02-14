import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import authGuard from "./components/HigherOrderComponent/AuthGuard";
import axios from "axios";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Home from "./components/Home";
import VehicleDetails from "./components/VehicleDetails";
import ListCars from "./components/ListCars";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import SellCar from "./components/SellCarComponent";
import reducers from "./reducers";
import UserProfile from "./components/UserProfile";
import ListAdminCars from "./components/ListAdminCars";
import MarketCarComponent from "./components/MarkerCarComponent";
import VerifyUser from "./components/VerifyUser";
import RequestPasswordReset from "./components/RequestPasswordReset";
import PasswordReset from "./components/PasswordReset";
import UserList from "./components/UserList";
import ContactUs from "./components/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
const jwtToken = localStorage.getItem("JWT_TOKEN");
axios.defaults.headers.common["Authorization"] = jwtToken;

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false,
        },
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route exact path="/vehicle/:vehicleId" component={VehicleDetails} />
        <Route exact path="/listadmincars" component={ListAdminCars} />
        <Route
          exact
          path="/listcars/:vehicles?/:models?/:location?/:yearMin?/:yearMax?/:priceMin?/:priceMax?"
          component={ListCars}
        />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/userList/:userID" component={UserList} />
        <Route exact path="/userprofile" component={authGuard(UserProfile)} />
        <Route exact path="/verify/:secretToken" component={VerifyUser} />
        <Route
          exact
          path="/requestpasswordreset"
          component={RequestPasswordReset}
        />
        <Route
          exact
          path="/resetpassword/:userId/:secretToken"
          component={PasswordReset}
        />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        <Route
          exact
          path="/marketcar/:vehicleId"
          component={authGuard(MarketCarComponent)}
        />
        <Route exact path="/sellcar" component={authGuard(SellCar)} />
        <Route exact path="/contactUs" component={ContactUs} />
        <Route exact path="/privacyPolicy" component={PrivacyPolicy} />
        <Route
          exact
          path="/termsAndConditions"
          component={TermsAndConditions}
        />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
