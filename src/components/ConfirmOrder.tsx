import products from "../utils/data.json"
import { FaRegCircleCheck } from "react-icons/fa6";
import { Product } from "./Cart";
type ConfirmOrderProps = {
    cart: Product[];
    handleStartNewOrder: () => void;
};
const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ cart, handleStartNewOrder }) => {
    console.log('ConfirmOrder rendered');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <section className='confirm-background'>
            <div className='confirm-container'>
                <div className='cofirm-header'>
                    <FaRegCircleCheck color='green' size={"2rem"} />
                    <h3 className='confirm-heading'>Order confirmed</h3>
                    <p className='confirm-subheading'>We hope you enjoy your food!</p>
                </div>
                <div className="confirm-list">
                    {cart.map((item: Product, index: number) => {
                        return (<div key={index} className='confirm-item'>
                            <div className="confirm-image-container">
                                <img src={item?.image?.desktop} />
                                <div className="confirm-product-info">
                                    <span className="confirm-product-name">{item?.name}</span>
                                    <div className="confirm-product-price">
                                        <span>{item.quantity}x</span>
                                        <div> @ ${item.price}</div>
                                    </div>
                                </div>
                            </div>
                            <span className="confirm-price">${item?.price * item.quantity}</span>
                        </div>)
                    })}
                </div>
                <div className='cart-total-container'>
                    <span className='order-total-text'>Order Total</span>
                    <span className='order-total'>${total}</span>
                </div>
                <button onClick={handleStartNewOrder} className='cart-button'>Start new order</button>
            </div>
        </section>
    )
}

export default ConfirmOrder