import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import Alert from "../UI/alert";
import Footer from "./footer/footer";
import Navigation from "./navigation/navigation";

const Wrapper = (props) => {
  const alert = useSelector(state => state.alert)

  return (
    <>
      <Navigation />
      {ReactDOM.createPortal(
        <Alert message={alert.message} type={alert.type} />,
        document.getElementById('alert-root')
      )}
      {props.children}
      <Footer />
    </>
  );
};

export default Wrapper;
