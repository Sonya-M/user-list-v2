import { ListEntry } from './ListEntry.jsx';
import { CardEntry } from './CardEntry.jsx';

import { includesIgnoreCase } from "../utilities/helperFns"

import { Container, ListGroup, Row } from "react-bootstrap";
import { NoResults } from './NoResults';
import { StatsDisplay } from "./StatsDisplay";


export function UserList(props) {

  const emailHeading = "email: ";
  const dobHeading = "Date of birth: ";
  const { gridView } = props;

  const users = props.userList.filter((user) => {
    return includesIgnoreCase(user.fullName,
      props.filterText);
  });

  const nFemales = users.reduce((total, user) => {
    if (user.gender === "female") return total + 1;
    else return total;
  }, 0);

  const Entry = gridView ? CardEntry : ListEntry;
  const userEntries =
    users.map((user) => {
      return (
        <Entry
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          dob={user.dob}
          img={user.img}
          emailHeading={emailHeading}
          dobHeading={dobHeading}
          className={user.gender === "female" ? " female " : ""}
        />
      );
    });

  const userEntryContainer =
    (gridView)
      ?
      (<Row
        className="d-flex flex-row justify-content-center"
        id="userList">
        {userEntries}
      </Row>)
      :
      (<ListGroup
        id="userList">
        {userEntries}
      </ListGroup>);

  return (
    userEntries.length
      ?
      (< Container fluid className="mx-auto mb-5" >
        <StatsDisplay
          nMales={userEntries.length - nFemales}
          nFemales={nFemales}
        />
        {userEntryContainer}
      </Container>)
      :
      (
        <NoResults message="Sorry, no results" />
      )

  );
}