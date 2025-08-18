import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../App'
import { supabase } from '../supabaseClient'

function Cart({ user }) {
  const { cart, setCart } = useContext(CartContext)
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const checkout = async () => {
    if (!user) {
      alert('Please sign in to checkout.')
      return
    }
    // Create order in Supabase
    const { data: order, error } = await supabase
      .from('orders')
      .insert([{ user_id: user.id, total }])
      .select()
      .single()
    if (error) {
      alert('Order failed.')
      return
    }
    // Insert order items
    const items = cart.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))
    await supabase.from('order_items').insert(items)
    setCart([])
    navigate('/order-confirmation')
  }

  if (cart.length === 0) return <div>Your cart is empty.</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx} className="mb-2 flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${item.price * item.quantity}</span>
          </li>
        ))}
      </ul>
      <div className="font-bold mt-4">Total: ${total}</div>
      <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={checkout}>
        Checkout
      </button>
    </div>
  )
}

export default Cart
