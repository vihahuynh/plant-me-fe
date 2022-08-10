import Rating from '@mui/material/Rating';
import Price from '../UI/price';
import styles from "./productInfo.module.scss"

const ProductInfo = ({ product }) => {
    return <div>
        <h3>{product.title}</h3>
        <div>
            <Rating name="read-only" value={product.rating} readOnly />
            <span>{product.ratingCount} ratings</span>
            <span>{product.reviewCount} reviews</span>
            <span>Sold: {product.soldCount}</span>
        </div>
        <Price price={product.price} salePercent={product.salePercent} />
        <div>
            <p>Size</p>
            <ul>
                {product?.size?.map(s => <li key={s}>{s}</li>)}
            </ul>
        </div>
    </div>
}

export default ProductInfo