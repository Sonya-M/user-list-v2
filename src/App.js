import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ErrorDisplay } from "./components/ErrorDisplay";
import About from "./components/About";
import Main from "./components/Main";
import SingleUser from "./components/SingleUser";
import NavWrapper from "./components/NavWrapper";
import FooterWrapper from "./components/FooterWrapper";
import { DataContextProvider } from "./store/data-context";
import { Container } from "react-bootstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/App.scss";


function App() {
  return (
    <Container fluid id="user-list-app">
      <DataContextProvider>
        <NavWrapper />
        <Switch>
          <Route exact path="/user-list-v2">
            <Main />
          </Route>
          <Route exact path="/about" component={About} />
          <Route exact path="/user/:id" component={SingleUser} />

          <Route >
            <ErrorDisplay message="Sorry, page not found" />
          </Route>
        </Switch>
        <FooterWrapper />
      </DataContextProvider>
    </Container>
  );
}

export default App;
