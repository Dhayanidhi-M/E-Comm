import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { CartContext } from '../App'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    supabase.from('products').select('*').eq('id', id).single().then(({ data }) => setProduct(data))
  }, [id])

  if (!product) return <div>Loading...</div>

  const addToCart = () => {
    setCart([...cart, { ...product, quantity: 1 }])
  }

  return (
    <div>
      <img src={product.image_url} alt={product.name} className="h-64 object-cover mb-4" />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <p className="mb-4">{product.description}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductDetail
