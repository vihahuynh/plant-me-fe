import Footer from "./footer/footer";
import Navigation from "./navigation/navigation";

const Wrapper = (props) => {
  return (
    <>
      <Navigation />
      {props.children}
      <Footer />
    </>
  );
};

export default Wrapper;
