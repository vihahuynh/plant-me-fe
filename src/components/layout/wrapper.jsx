import Navigation from "./navigation/navigation";

const Wrapper = (props) => {
  return (
    <>
      <Navigation />
      {props.children}
    </>
  );
};

export default Wrapper;
