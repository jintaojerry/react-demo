import React from "react";
import "./index.scss";

import SlideBar from "../../components/slideBar/slideBar";
import Header from "../../components/header/header";
import Tab from "../../components/tab/tab";
import ChildRoute from "../../router/childRoute";

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Header />
        <div className="content">
          <SlideBar />
          <div className="main-content">
            <Tab />
            <div className="child-route">
              <ChildRoute />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
