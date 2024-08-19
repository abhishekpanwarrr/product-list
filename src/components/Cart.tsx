import { IoCloseCircleOutline } from "react-icons/io5";
import { RiTreeLine } from "react-icons/ri";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export type Product = {
    image?: any;
    name: string;
    category: string;
    price: number;
    quantity: number;
};

type CartProps = {
    cart: Product[];
    handleConfirmOrder: () => void;
    removeFromCart: (product: Product) => void;
    addToCart?: (product: Product) => void;
};

const Cart: React.FC<CartProps> = ({ cart, handleConfirmOrder, removeFromCart }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        // <section className='cart-container'>
        <div className='cart-container-inner'>
            <h3 className='cart-heading'>Your cart ({cart.length})</h3>
            {cart.length > 0 ? <>
                <div className='cart-list'>
                    {cart.map((item: any, index: number) => {
                        console.log("item", item);

                        return (
                            <div key={index} className='cart-list-item'>
                                <div>
                                    <p className='cart-item-name'>{item.name}</p>
                                    <div className='cart-item-spec'>
                                        <span className='cart-item-spec-quantity'>{item.quantity}x</span>
                                        <span className='cart-item-spec-sPrice'>@${item.price}</span>
                                        <span className='cart-item-spec-tPrice'>${item.price * item.quantity}</span>
                                    </div>
                                </div>
                                <IoCloseCircleOutline onClick={() => removeFromCart(item)} className='icon' size={22} color='hsl(14, 86%, 42%)' />
                            </div>
                        )
                    })}
                </div>
                <div className='cart-total-container'>
                    <span className='order-total-text'>Order Total</span>
                    <span className='order-total'>${total.toFixed(2)}</span>
                </div>
                <div className='cart-button-container'>
                    <div className='cart-button-container-text'>
                        <RiTreeLine color="green" size={".7rem"} /> This is a <b>carbon-neutral</b> delivery
                    </div>
                    <button onClick={handleConfirmOrder} className='cart-button'>Confirm order</button>
                </div>
            </>
                :
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <div style={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <span style={{
                            color: "#333",
                            fontSize: "16px"
                        }}>Your added items will appear here</span>
                        <MdOutlineRemoveShoppingCart size={30} />
                    </div>
                </div>
            }
        </div>
        // </section>
    )
}

export default Cart