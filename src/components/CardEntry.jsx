import { Card } from "react-bootstrap";
import "../style/CardEntry.scss"

export function CardEntry({ firstName, lastName, email, dob, img, dobHeading, className }) {
  const classList = "cardEntry m-2 p-1 " + className;
  return (
    <Card className={classList}>
      <div className="imgContainer">
        <img variant="top" src={img} alt={firstName} />
        <p className="nameInImage">{firstName}</p>
      </div>

      <Card.Body>
        <Card.Text>
          {firstName + " " + lastName}<br />
          {email}<br />
          {dobHeading}{dob}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}