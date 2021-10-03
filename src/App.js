import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ErrorDisplay } from "./components/ErrorDisplay";
import About from "./components/About";
import Main from "./components/Main";
import SingleUser from "./components/SingleUser";

import { Container } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/App.scss";


function App() {
  return (
    <Container fluid id="user-list-app">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/about" component={About} />
        <Route exact path="/user/:id" component={SingleUser} />
        <Route exact path="/home">
          <Redirect to="/" />
        </Route>
        <Route >
          <ErrorDisplay message="Sorry, page not found" />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
