import { useEffect, useState } from 'react'
import products from "./utils/data.json"
console.log("🚀 ~ products:", products)
import { MdAddShoppingCart } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import Cart, { Product } from './components/Cart';
import { createPortal } from 'react-dom';
import ConfirmOrder from './components/ConfirmOrder';


function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false)

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const itemExists = prevCart.find(item => item.name === product.name && item.category === product.category);
      if (itemExists) {
        return prevCart.map(item =>
          item.name === product.name && item.category === product.category
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => {
      return prevCart
        .map(item => item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0);
    });
  };

  function handleConfirmOrder() {
    if (cart.length <= 0) {
      alert("Please add items in cart!")
      return
    }
    setIsVisible(true);
  }
  function handleStartNewOrder() {
    setCart([]);
    setIsVisible(false);
  }

  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isVisible]);
  return (
    <main className='section'>
      <section className='section-products'>
        <h3 className=''>Dessert</h3>
        <div className='product-container'>
          {products?.map((product: any, index: number) => {
            const inCart = cart.some((item: any) => item.name === product.name && item.category === product.category);
            const productInCart = cart.find((item: any) => item.name === product.name && item.category === product.category);
            // @ts-ignore
            const quantity = productInCart ? productInCart?.quantity : 0;
            return (
              <article key={index} >
                <div style={{
                  backgroundImage: `URL(${product.image.desktop})`,
                }} className={`product-image-contaienr ${inCart && "selected"}`}>
                  {inCart ? <div className='addToCart-container redbackground'>
                    <CiCirclePlus onClick={() => addToCart(product)} role='button' className='icon' /> <span>{quantity}</span> <CiCircleMinus role='button' className='icon' onClick={() => removeFromCart(product)} />
                  </div> : <button className='addToCart-container-button'>
                    <MdAddShoppingCart className='addToCartIcon' />
                    <span role='button' onClick={() => addToCart(product)}>Add to cart</span>
                  </button>}
                </div>
                <div className='product-info'>
                  <p className='product-category'>{product.category}</p>
                  <p className='product-name'>{product.name}</p>
                  <p className='product-price'>${product.price}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
      <Cart cart={cart} removeFromCart={removeFromCart} handleConfirmOrder={handleConfirmOrder} />
      {/* @ts-ignore */}
      {isVisible && createPortal(<ConfirmOrder cart={cart} handleStartNewOrder={handleStartNewOrder} />, document.getElementById("portal-root"))}
    </main>
  )
}

export default App
