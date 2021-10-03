import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../store/data-context";
import { ErrorDisplay } from "./ErrorDisplay";
import { Container, Table } from "react-bootstrap";
import "../style/SingleUser.scss";

const SingleUser = (props) => {
  let { id } = useParams();
  const ctx = useContext(DataContext);
  const user =
    ctx.userList.length === 0
      ? null
      : ctx.userList.find((user) => user.id === id);
  console.log(user);

  if (!user) return <ErrorDisplay msg="Sorry, failed to load data" />;

  return (
    <Container className="my-5" id="single-user-page">
      <header>
        <img className="userImg" src={user.img} alt={user.fullName} />
        <h1 className="display-3">{user.fullName}</h1>
      </header>
      <Table striped bordered hover responsive="xs">
        <tbody>
          <tr>
            <th>email</th>
            <td>{user.fullEmail}</td>
          </tr>
          <tr>
            <th>phone</th>
            <td>{user.cell}</td>
          </tr>
          <tr>
            <th>birthday</th>
            <td>{user.dob}</td>
          </tr>
          <tr>
            <th>country</th>
            <td>{user.location.country}</td>
          </tr>
          <tr>
            <th>city</th>
            <td>{user.location.city}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default React.memo(SingleUser);
