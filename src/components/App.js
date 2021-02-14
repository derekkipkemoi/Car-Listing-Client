import React from "react";

import "./fontAwesomeIcons";
import Header from "./Header";
import Footer from "./Footer";
import "../assets/css/index.css";
import SubscribeForm from "../components/SubscribeForm";

//<SubscribeForm/>

export default (props) => {
  return (
    <div>
      <Header />

      <div>{props.children}</div>

      <Footer />
    </div>
  );
};
