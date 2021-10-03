import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import ScrollToTopBtn from "./ScrollToTopBtn";
import { UserList } from "./UserList";
import "../style/SearchableUserList.scss";

class SearchableUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleInput(event) {
    event.preventDefault();
    const filterText = event.target.value;
    if (this.state.filterText === filterText) return;
    this.setState({ filterText });
  }

  // this worked to prevent default on pressing "enter"
  handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  render() {
    return (
      <React.Fragment>
        <Form id="searchUsers" className="d-flex justify-content-center m-2">
          {/* InputGroup needed for the icon */}
          <InputGroup className="mb-3">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              className="searchBox"
              type="text"
              name="filterText"
              placeholder="Search people"
              value={this.state.filterText}
              onInput={(e) => this.handleInput(e)}
              onKeyDown={(e) => this.handleKeyDown(e)} // this worked to prevent default on pressing "enter"
            />
          </InputGroup>
        </Form>
        <UserList {...this.props} filterText={this.state.filterText} />
        <ScrollToTopBtn />
      </React.Fragment>
    );
  }
}

export default SearchableUserList;
