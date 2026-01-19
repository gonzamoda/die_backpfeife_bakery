import CancelIcon from "@mui/icons-material/Cancel";
import Button from "react-bootstrap/Button";

const CancelButton = ({ cancelAction }) => {
  return (
    <Button className="backButton" onClick={() => cancelAction()}>
      <CancelIcon className="backButtonIcon" />
    </Button>
  );
};

export default CancelButton;
