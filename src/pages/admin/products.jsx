import { useSelector } from "react-redux";
import Wrapper from "../../components/layout/wrapper";
import ProductTable from "../../components/products/productsTable";
import InfoBox from "../../components/UI/infoBox";

const AdminProducts = () => {
  const authen = useSelector(state => state.authentication)
  if (!authen.user?.isAdmin)
    <Wrapper>
      <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />
    </Wrapper>
  return (
    <Wrapper>
      <ProductTable />
    </Wrapper>
  );
};

export default AdminProducts;
