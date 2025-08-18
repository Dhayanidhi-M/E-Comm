import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    supabase.from('products').select('*').then(({ data }) => setProducts(data || []))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="border rounded p-4 flex flex-col">
            <img src={product.image_url} alt={product.name} className="h-40 object-cover mb-2" />
            <h2 className="font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>
            <Link to={`/product/${product.id}`} className="mt-auto text-blue-600">View</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
