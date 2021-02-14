import React, { Component } from "react";

import FilterComponent from "./FilterComponentHome";

class Jumbotron extends Component {
  render() {
    return (
      <div>
        <div
          className="jumbotron jumbotron-fluid"
          style={{ marginTop: "50px" }}
          id="container"
        >
          <div className="container">
            <div className="col">
              <h6 className="display-4 text-light font-weight-bold">Nunua / Uza Motii.</h6>
            </div>
          </div>

          <div className=""></div>

          <div
            className="col-md-12"
            id="copyright"
            style={{ marginTop: "50px" }}
          >
            <FilterComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default Jumbotron;
