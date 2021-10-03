import { ChevronUp } from "react-bootstrap-icons";
import "../style/ScrollToTopBtn.scss";

export default function ScrollToTopBtn() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <button id="goToTop" onClick={handleClick}>
      <ChevronUp size="1.5rem" />
    </button>
  );
}
