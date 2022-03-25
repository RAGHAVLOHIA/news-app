import "./App.css";

import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export class App extends Component {
  pageSize = 6;
  apiKey = process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/Business"
              element={
                <News
                  key="technology"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="technology"
                />
              }
            />

            <Route
              exact
              path="/Entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/General"
              element={
                <News
                  key="general"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/Health"
              element={
                <News
                  key="health"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/Science"
              element={
                <News
                  key="science"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/Sports"
              element={
                <News
                  key="sports"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/Technology"
              element={
                <News
                  key="technology"
                  pageSize={this.pageSize}
                  country="in"
                  apiKey={this.apiKey}
                  category="technology"
                />
              }
            />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
