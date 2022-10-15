import { useState } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import addressService from "../../services/address";
import AddressForm from "./addressForm";
import Modal from "../UI/modal";
import Button from "./../UI/buttons/button";

import { CgCheckO } from "react-icons/cg";

import styles from "./addressItem.module.scss";

const AddressItem = ({
  address,
  setAddresses,
  onChangeDefaultAddress,
  btnText = "Set as default",
  defaultText = "Default address",
  isShowAll = false,
}) => {
  const authen = useSelector((state) => state.authentication);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const onOpenEditAddress = () => setShowEditForm(true);
  const onCloseEditAddress = () => setShowEditForm(false);
  const onOpenConfirmBox = () => setShowConfirmDelete(true);
  const onCloseConfirmBox = () => setShowConfirmDelete(false);

  const onDeleteAddress = async () => {
    try {
      await addressService.remove(address.id, authen?.user?.token);
      setAddresses((prev) => prev.filter((a) => a.id !== address.id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <li className={styles.addressItem}>
      <div className={styles.btnGroup}>
        {(!address.isDefault || isShowAll === true) && (
          <Button
            text={btnText}
            borderRadius="square"
            size="small"
            theme="light"
            onClick={() => onChangeDefaultAddress(address)}
          />
        )}
        <Button
          text="Edit"
          borderRadius="square"
          size="small"
          theme="blue"
          onClick={onOpenEditAddress}
        />
        {!address.isDefault && (
          <Button
            text="Delete"
            borderRadius="square"
            size="small"
            theme="red"
            onClick={onOpenConfirmBox}
          />
        )}
      </div>
      <div className={styles.addressHeader}>
        <p>{address.name.toUpperCase()}</p>
        {address.isDefault && (
          <div className={styles.defaultAddress}>
            <CgCheckO className={styles.icon} />
            {defaultText}
          </div>
        )}
      </div>
      <p>
        <span>Address: </span>
        {address.address}
      </p>
      <p>
        <span>Phone number: </span>
        {address.phoneNumber}
      </p>
      {ReactDOM.createPortal(
        <Modal isOpen={showEditForm} size="medium" showButtonGroup={false}>
          <h5>Update address</h5>
          <AddressForm
            address={address}
            onCancel={onCloseEditAddress}
            setAddresses={setAddresses}
          />
        </Modal>,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          isOpen={showConfirmDelete}
          title="Delete address"
          message="Are you sure you want to delete this address"
          actionText="Delete"
          onConfirm={onDeleteAddress}
          onCancel={onCloseConfirmBox}
          size="small"
        />,
        document.getElementById("overlay-root")
      )}
    </li>
  );
};

export default AddressItem;
