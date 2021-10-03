import { ListGroupItem, Row, Col } from "react-bootstrap";
import { EnvelopeFill, GiftFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

import "../style/ListEntry.scss";

export function ListEntry(props) {
  const { id, firstName, lastName, email, dob, img, className } = props;
  const classList = "listEntry " + className;
  return (
    <ListGroupItem className={classList}>
      <Link to={"/user/" + id}>
        <Row>
          <Col sm="auto">
            <img src={img} alt={firstName + " " + lastName} />
          </Col>
          <Col sm="auto">
            <span className="name">{firstName + " " + lastName}</span> <br />
            <span>
              <EnvelopeFill />{" "}
            </span>{" "}
            {email}
            <br />
            <span>
              <GiftFill />{" "}
            </span>
            {dob}
            <br />
          </Col>
        </Row>
      </Link>
    </ListGroupItem>
  );
}
