import React from 'react'
import defaultImg from '../../../assets/img/default.png'

export const ItemCard = ({ product }) => {

    return (
        <div className="item__card">

            <img src={product.images[0] ? product.images[0]?.src : defaultImg} alt={product.name} />

            <div className="card__content">
                <h4>{product.name}</h4>
                <div className="short__desc">
                    <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
                </div>
                <div className="price__holder">
                    <div dangerouslySetInnerHTML={{ __html: product.price_html }} />
                </div>
                {
                    product.stock_status === 'instock'
                        ? (
                            <p><span className='available'>Disponibles</span>: {product.stock_quantity}</p>
                        ) : (
                            <p className='unavailable'>Agotado</p>
                        )
                }
            </div>

        </div>
    )
}
