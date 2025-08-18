import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { supabase } from './supabaseClient'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Auth from './pages/Auth'
import OrderConfirmation from './pages/OrderConfirmation'

export const CartContext = React.createContext()

function App() {
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => listener?.subscription.unsubscribe()
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Router>
        <nav className="bg-gray-800 p-4 flex justify-between">
          <div>
            <Link to="/" className="text-white font-bold text-xl">E-Comm</Link>
          </div>
          <div className="flex gap-4">
            <Link to="/cart" className="text-white">Cart ({cart.length})</Link>
            {user ? (
              <button className="text-white" onClick={() => supabase.auth.signOut()}>Sign Out</button>
            ) : (
              <Link to="/auth" className="text-white">Sign In</Link>
            )}
          </div>
        </nav>
        <div className="p-4 max-w-4xl mx-auto">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart user={user} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
        </div>
      </Router>
    </CartContext.Provider>
  )
}

export default App
