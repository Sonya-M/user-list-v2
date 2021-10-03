import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/CardEntry.scss";

export function CardEntry(props) {
  const { id, firstName, lastName, email, dob, img, dobHeading, className } =
    props;
  const classList = "cardEntry m-2 p-1 " + className;
  return (
    <Card className={classList}>
      <Link to={"/user/" + id}>
        <div className="imgContainer">
          <img variant="top" src={img} alt={firstName} />
          <p className="nameInImage">{firstName}</p>
        </div>
        <Card.Body>
          <Card.Text>
            {firstName + " " + lastName}
            <br />
            {email}
            <br />
            {dobHeading}
            {dob}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
}
