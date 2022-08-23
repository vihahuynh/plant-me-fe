import ReactDOM from "react-dom";
import { useSelector } from "react-redux";

import PopupMessage from "../UI/popupMessage";
import Footer from "./footer/footer";
import Navigation from "./navigation/navigation";

const Wrapper = (props) => {
  const message = useSelector(state => state.message)

  return (
    <>
      <Navigation />
      {ReactDOM.createPortal(
        <PopupMessage message={message.message} type={message.type} />,
        document.getElementById('message-root')
      )}
      {props.children}
      <Footer />
    </>
  );
};

export default Wrapper;
