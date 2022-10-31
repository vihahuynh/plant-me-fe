import { useSelector } from "react-redux";
import Wrapper from "../../components/layout/wrapper";
import UpdateProductForm from "../../components/products/productUpdateForm";
import InfoBox from "../../components/UI/infoBox";

const UpdateProduct = () => {
  const authen = useSelector(state => state.authentication)
  if (!authen.user?.isAdmin)
    return <Wrapper>
      <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />
    </Wrapper>
  return (
    <Wrapper>
      <UpdateProductForm />
    </Wrapper>
  );
};

export default UpdateProduct;
