import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = () => {
    const z = localStorage.getItem('product')
    if (JSON.parse(z) === null) {
      this.setState({cartList: []})
    } else {
      this.setState({cartList: JSON.parse(z)})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state

    const int = cartList.find(each => each.id === product.id)

    if (int !== undefined) {
      localStorage.setItem(
        'product',
        JSON.stringify(
          cartList.map(each => {
            if (int.id === each.id) {
              return {...each, quantity: each.quantity + product.quantity}
            }
            return each
          }),
        ),
      )
    } else {
      localStorage.setItem('product', JSON.stringify([...cartList, product]))
    }

    this.setState(this.getUser)
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    localStorage.setItem(
      'product',
      JSON.stringify(
        cartList.map(each => {
          if (id === each.id) {
            return {...each, quantity: each.quantity + 1}
          }
          return each
        }),
      ),
    )
    this.setState(this.getUser)
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    localStorage.setItem(
      'product',
      JSON.stringify(
        cartList.map(each => {
          if (id === each.id) {
            return {...each, quantity: each.quantity - 1}
          }
          return each
        }),
      ),
    )
    this.setState(this.getUser)
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const result = cartList.filter(each => each.id !== id)

    localStorage.setItem('product', JSON.stringify(result))
    this.setState(this.getUser)
  }

  removeAllCartItems = () => {
    localStorage.setItem('product', JSON.stringify([]))
    this.setState(this.getUser)
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
