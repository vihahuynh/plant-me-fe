import OrderItem from "./orderItem"

const OrderList = ({ order }) => {
    return <ul>
        {order?.cart?.map((orderItem) => (
            <OrderItem key={`${orderItem.id}-${orderItem.color}-${orderItem.size}`} order={orderItem} />
        ))}
    </ul>
}

export default OrderList