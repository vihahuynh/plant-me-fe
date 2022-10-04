import { useEffect, useState } from "react";
import Button from "../../components/UI/buttons/button";
import Wrapper from "../../components/layout/wrapper";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import AddressForm from "../../components/address/addressForm";

import styles from "./deliveryAddress.module.scss"
import { useSelector } from "react-redux";
import addressService from "../../services/address";

import AddressItem from "../../components/address/addressItem";

const DeliveryAddress = () => {
    const authen = useSelector(state => state.authentication)
    const [addresses, setAddresses] = useState([])
    const [isShowForm, setIsShowForm] = useState(false)
    const onOpenAddressForm = () => setIsShowForm(true)
    const onCloseAddressForm = () => setIsShowForm(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const addressesData = await addressService.getAll(authen?.user?.token)
                setAddresses(addressesData.data)
            } catch (err) {
                console.log(err)
            }
        }
        if (authen?.user?.token) fetchData()
    }, [authen?.user?.token])

    return <Wrapper>
        <div className={styles.main}>
            <UserLeftMenu />
            <div className={styles.leftContainer}>
                {!isShowForm
                    ? <Button text="+ Add new address" size="full" borderRadius="square" theme="white" onClick={onOpenAddressForm} />
                    : <AddressForm onCancel={onCloseAddressForm} setAddresses={setAddresses} />
                }
                <ul className={styles.addressList}>
                    {addresses.map(address =>
                        <AddressItem address={address} setAddresses={setAddresses} />
                    )}
                </ul>
            </div>
        </div>
    </Wrapper>
}

export default DeliveryAddress