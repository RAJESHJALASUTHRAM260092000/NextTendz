// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const b = cartList.map(each => each.quantity * each.price)

      const a = b.reduce((each, lue) => each + lue)

      return (
        <div className="bg-container">
          <h1 className="headings">
            Order Total: <span>Rs {parseInt(a)}/-</span>
          </h1>
          <p className="para">{cartList.length} items in cart</p>
          <button className="btns" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
