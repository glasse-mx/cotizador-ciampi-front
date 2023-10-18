import React from 'react'
import { coinFormat } from '../../Hooks/useTools'

export const ProductsTable = ({ order, setOrder }) => {

    const { productos, descuentos } = order

    const handleDeleteProduct = (e) => {

        const deleteId = e.target.dataset.prod
        const newProducts = productos.filter(producto => producto.id != deleteId)
        setOrder({
            ...order,
            productos: newProducts
        })
    }

    const handleDeletePromo = (e) => {

        const deleteId = parseInt(e.target.dataset.desc) + 1
        console.log(deleteId)
        const newDescuentos = descuentos.splice(deleteId, 1)
        setOrder({
            ...order,
            descuentos: newDescuentos
        })

    }

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Articulo</th>
                    <th>Cant</th>
                    <th>Precio Unit.</th>
                    <th>Desc.</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{producto.name}</td>
                            <td>{producto.cant}</td>
                            <td>{coinFormat(parseInt(producto.price))}</td>
                            <td> - </td>
                            <td>{coinFormat(parseInt(producto.price) * producto.cant)}</td>
                            <td>
                                <span className="material-symbols-rounded cursor-pointer" onClick={handleDeleteProduct} data-prod={producto.id}>
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))
                }

                {
                    descuentos.map((descuento, index) => (
                        <tr key={index}>
                            <td> - </td>
                            <td>{descuento.descripcion}</td>
                            <td>{descuento.cant}</td>
                            <td> - </td>
                            <td>{coinFormat(descuento.valor)}</td>
                            <td>{coinFormat(descuento.cant * descuento.valor)}</td>
                            <td>
                                <span className="material-symbols-rounded cursor-pointer" onClick={handleDeletePromo} data-desc={index}>
                                    delete
                                </span>
                            </td>
                        </tr>
                    ))
                }
                {/* <tr>
                    <td>1</td>
                    <td>Maquina de Helado Suave D520S</td>
                    <td>1</td>
                    <td>$ 50,500.00</td>
                    <td>-</td>
                    <td>$ 50,500.00</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Base de Helado Suave de Leche - Chocolate</td>
                    <td>2</td>
                    <td>$ 1,000.00</td>
                    <td>-</td>
                    <td>$ 2,000.00</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Regulador Ciampi</td>
                    <td>1</td>
                    <td>$ 5,000.00</td>
                    <td>-</td>
                    <td>$ 5,000.00</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Promocion Regulador Gratis</td>
                    <td>1</td>
                    <td> - </td>
                    <td> -$ 5,000.00</td>
                    <td>- $5,000.00</td>
                </tr> */}
            </tbody>
        </table>
    )
}
