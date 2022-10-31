import { useSelector } from "react-redux";
import NewProductForm from "../../components/products/newProductForm";
import Wrapper from "../../components/layout/wrapper";
import InfoBox from "../../components/UI/infoBox";

const NewProduct = () => {
  const authen = useSelector(state => state.authentication)
  if (!authen.user?.isAdmin)
    return <Wrapper>
      <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />
    </Wrapper>;
  return (
    <Wrapper>
      <NewProductForm />
    </Wrapper>
  );
};

export default NewProduct;
