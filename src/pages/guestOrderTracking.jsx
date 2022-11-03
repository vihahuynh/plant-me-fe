import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Moment from "react-moment";

import Wrapper from "../components/layout/wrapper";
import OrderProgressBar from "./../components/UI/orderProgressBar";
import InfoBox from "../components/UI/infoBox";

import guestOrderService from "./../services/guestOrder";

import styles from "./user/orderTracking.module.scss";
import LinkButton from "../components/UI/buttons/linkbutton";

const GuestOrderTracking = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const orderData = await guestOrderService.get(orderId);
            setOrder(orderData.data);
        };
        fetchData();
    }, [orderId]);

    if (!order)
        return (
            <InfoBox text="No order found" btnText="Back to home page" url="/" />
        );

    return (
        <Wrapper>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.orderHeader}>
                        <h4>
                            Order: #{order.id} - <span>{order.status}</span>
                        </h4>
                        <p>
                            Order date: <Moment format="YYYY-MM-DD">{order.createdAt}</Moment>
                        </p>
                    </div>
                    <div className={styles.trackingInfo}>
                        <div className={styles.orderTracking}>
                            <h5>{order?.status}</h5>
                            <OrderProgressBar steps={order?.progress} />
                        </div>
                        <div className={styles.itemListContainer}>
                            <h5>Order includes</h5>
                            <ul className={styles.itemList}>
                                {order.cart.map((item) => (
                                    <li className={styles.item}>
                                        <div className={styles.imgContainer}>
                                            <img className={styles.itemImg} src={item.image} alt="" />
                                            <span className={styles.quantity}>x{item.quantity}</span>
                                        </div>
                                        <div>
                                            <p className={styles.itemTitle}>{item.title}</p>
                                            <div>Size: {item.size}</div>
                                            <div>
                                                Color:
                                                <span
                                                    className={styles.color}
                                                    style={{ backgroundColor: item.color }}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <LinkButton
                        className={styles.viewDetailsBtn}
                        text="View order details"
                        borderRadius="square"
                        url={`/orders/view/${order.id}`}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default GuestOrderTracking;
