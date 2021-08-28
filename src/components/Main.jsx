import React from "react";
import NavWrapper from "./NavWrapper";
import FooterWrapper from "./FooterWrapper";
import MainMenu from "./MainMenu";
import MainContent from "./MainContent"

import { delayedFetchUserData, fetchUserData } from "../data/userData.js";
import { getTimeAgo } from "../utilities/helperFns";

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      gridView: false,
      isLoading: true,
      lastRefresh: 0,
      timeFromLastRefresh: "",
    };
    this.handleToggleView = this.handleToggleView.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleToggleView() {
    this.setState((state) => {
      return { gridView: !state.gridView };
    });
  }

  handleRefresh() {
    this.setState({ isLoading: true });
    this.loadData();
  }

  componentDidMount() {
    this.loadData();
    this.intervalID = setInterval(this.calculateTimeSinceRefresh.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  loadData() {
    // fetchUserData()
    delayedFetchUserData(1000) // simulate waiting for response...
      .then((userList) => {
        this.setState({
          userData: userList,
          isLoading: false,
          lastRefresh: Date.now(),
        });
        // console.log(this.state.userData);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
          userData: []
        });
      });
  }

  calculateTimeSinceRefresh() {
    if (this.state.lastRefresh) {
      const time = getTimeAgo(this.state.lastRefresh);
      this.setState({
        timeFromLastRefresh: "Last Update: " + time,
      });
    }
  }

  render() {
    return (
      <div>
        <NavWrapper
          menu={<MainMenu
            onRefresh={this.handleRefresh}
            onToggleView={this.handleToggleView}
            gridView={this.state.gridView}
          />}>

        </NavWrapper>
        <MainContent
          isLoading={this.state.isLoading}
          userList={this.state.userData}
          gridView={this.state.gridView}
        />
        <FooterWrapper info={this.state.timeFromLastRefresh} />
      </div>
    )
  }
}

export default Main;