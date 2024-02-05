import React from 'react'

export default function Product({product}) {
  return (
     <div className='card'>
       <img src={require('.'+product.image)} className='card-img-top' alt="product"/>
       <div className='card-body'>
          <h5 className='card-title'>{product.name}</h5>
          <p className='card-text'>${product.price}</p>
       </div>
     </div>
  )
}
