import { useState } from "react";
import ReactDOM from "react-dom";

import styles from "./stocks.module.scss";
import Button from "./../UI/buttons/button";
import Modal from "./../UI/modal";
import StockForm from "./stockForm";
import stockSerice from "../../services/stock";
import { useSelector } from "react-redux";

const Stocks = ({ product }) => {
  const authen = useSelector((state) => state.authentication);

  const [openFormModal, setOpenFormModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [currentStock, setCurrentStock] = useState(null);
  const [stocks, setStocks] = useState(product?.stocks || []);
  const onCloseFormModal = () => setOpenFormModal(false);

  const onOpenConfirmModal = () => setOpenConfirmModal(true);
  const onCloseConfirmModal = () => setOpenConfirmModal(false);

  const onEditStock = (stock) => {
    setCurrentStock(stock);
    setOpenFormModal(true);
  };

  const onAddStock = () => {
    setCurrentStock(null);
    setOpenFormModal(true);
  };

  const onConfirmDelete = (stock) => {
    setCurrentStock(stock);
    onOpenConfirmModal();
  };

  const onDeleteStock = async (id) => {
    try {
      await stockSerice.remove(id, authen?.user?.token);
      setStocks((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    } finally {
      setCurrentStock(null);
      onCloseConfirmModal();
    }
  };

  if (!product) return;
  return (
    <div className={styles.container}>
      <Button
        className={styles.addBtn}
        text="Add new stock"
        size="small"
        borderRadius="square"
        onClick={onAddStock}
      />
      <h2>Stock</h2>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr className={styles.tableRow}>
            <th>Product</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((s) => (
            <tr className={styles.tableRow} key={s.id}>
              <td>{product.title}</td>
              <td>{s.size}</td>
              <td>
                <span
                  className={styles.color}
                  style={{ backgroundColor: s.color }}
                ></span>
              </td>
              <td>{s.quantity}</td>
              <td>
                <div className={styles.btnGroup}>
                  <Button
                    text="Edit"
                    size="small"
                    borderRadius="square"
                    theme="blue"
                    onClick={() => onEditStock(s)}
                  />
                  <Button
                    text="Delete"
                    size="small"
                    borderRadius="square"
                    theme="red"
                    onClick={() => onConfirmDelete(s)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {ReactDOM.createPortal(
        <Modal isOpen={openFormModal} size="large" showButtonGroup={false}>
          <h5>{currentStock?.id ? "Update stock" : "Add new stock"}</h5>
          <p>
            <strong>Product:</strong> {product.title} - <strong>ID: </strong>
            {product.id}
          </p>
          <StockForm
            stock={currentStock}
            productId={product?.id}
            onCancel={onCloseFormModal}
            setStocks={setStocks}
          />
        </Modal>,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          isOpen={openConfirmModal}
          size="small"
          title="Delete stock"
          message="Are you sure you want to delete this stock?"
          actionText="Delete"
          onConfirm={() => onDeleteStock(currentStock.id)}
          onCancel={onCloseConfirmModal}
        />,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

export default Stocks;
