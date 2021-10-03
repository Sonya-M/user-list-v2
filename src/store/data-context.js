import React from "react";
import {
  retrieveUserData,
  delayedRetrieveUserData,
  dataInStorage,
} from "../data/userData.js";


const DataContext = React.createContext({
  userList: [],
  isLoading: null,
  gridView: null,
  onRefresh: () => { },
  onToggleView: () => { },
  lastRefresh: 0,
})
export default DataContext;

export class DataContextProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      gridView: JSON.parse(localStorage.getItem("gridView")) || false,
      isLoading: true,
      lastRefresh: JSON.parse(localStorage.getItem("lastRefresh")) || 0,
    };

    this.handleToggleView = this.handleToggleView.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }
  handleToggleView() {
    this.setState((state) => {
      return { gridView: !state.gridView };
    }, () => { localStorage.setItem("gridView", this.state.gridView); });
  }

  handleRefresh() {
    this.setState({ isLoading: true });
    this.loadData(true);
  }

  componentDidMount() {
    this.loadData(false);
  }

  componentWillUnmount() {
    localStorage.setItem("lastRefresh", this.state.lastRefresh);
  }

  loadData(fetchNew) {
    // check if new content will be fetched regardless of fetchNew value:
    // (need it to set the value of lastRefresh)
    if (!fetchNew && !dataInStorage()) fetchNew = true;
    retrieveUserData(fetchNew)
      // delayedRetrieveUserData(fetchNew, 1000) // simulate waiting for response...
      .then((userList) => {
        this.setState((prevState) => {
          return {
            userData: userList,
            isLoading: false,
            lastRefresh: fetchNew ? Date.now() : prevState.lastRefresh,
          };
        }, () => { localStorage.setItem("lastRefresh", this.state.lastRefresh); });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isLoading: false,
          userData: [],
        });
      });
  }

  render() {
    return (
      <DataContext.Provider
        value={{
          userList: this.state.userData,
          isLoading: this.state.isLoading,
          gridView: this.state.gridView,
          onRefresh: this.handleRefresh,
          onToggleView: this.handleToggleView,
          lastRefresh: this.state.lastRefresh,
        }}
      >
        {this.props.children}
      </ DataContext.Provider >
    )
  }

}
