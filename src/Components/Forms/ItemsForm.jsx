import { Button, TextField } from "@mui/material"
import { useState, useRef, useEffect } from "react"
import { ProductoForm } from "./ProductoForm"


export const ItemsForm = ({ order, setOrder }) => {

    const { productos, descuentos, subtotal_productos, subtotal_promos, total } = order
    const [isAddingProduct, setIsAddingProduct] = useState(false)
    const [isAddingPromo, setIsAddingPromo] = useState(false)

    const initialPromoValue = {
        id: 0,
        descripcion: '',
        cant: 0,
        valor: 0,
        subtotal: 0
    }

    const toggleIsAddingProduct = () => {
        setIsAddingProduct(!isAddingProduct)
    }

    const toggleIsAddingPromo = () => {
        setIsAddingPromo(!isAddingProduct)
    }

    const [promoValue, setPromoValue] = useState(initialPromoValue)
    const subtotalRef = useRef(0)

    const onPromoChange = (e) => {
        const field = e.target.name
        const value = e.target.value

        setPromoValue({
            ...promoValue,
            [field]: (field === 'descripcion') ? value : parseInt(value)
        })
    }

    const handleAddPromo = () => {

        setOrder({
            ...order,
            descuentos: [
                ...descuentos,
                promoValue
            ],
            subtotal_promos: subtotal_promos + promoValue.valor,
        })

        const subtotal = subtotalRef.current.value

        setPromoValue({
            ...promoValue,
            subtotal
        })
        setPromoValue(initialPromoValue)
        setIsAddingPromo(false)
    }

    const handleAddProduct = (product) => {

        setOrder({
            ...order,
            productos: [
                ...productos,
                {
                    id: product.id,
                    name: product.name,
                    cant: product.cant || 1,
                    price: parseInt(product.price),
                    subtotal: parseInt(product.price) * (product.cant || 1),
                    sku: product.sku
                }
            ],
            subtotal_productos: subtotal_productos + (parseInt(product.price) * (product.cant || 1)),
        })

        setIsAddingProduct(false)
    }

    useEffect(() => {
        setOrder({
            ...order,
            total: subtotal_productos - subtotal_promos
        })
    }, [subtotal_productos, subtotal_promos])

    return (
        <>
            <div className="row flex justify-center">
                <Button onClick={toggleIsAddingProduct}>
                    Agregar Producto
                </Button>
                <Button onClick={toggleIsAddingPromo}>
                    Agregar Promocion
                </Button>

            </div>

            {
                isAddingPromo && (
                    <div className="flex my-4 align-center">
                        <TextField
                            name='descripcion'
                            label='Descripcion'
                            value={promoValue.descripcion}
                            onChange={onPromoChange}
                        />
                        <TextField
                            name='cant'
                            label='cant.'
                            type="number"
                            value={promoValue.cant}
                            onInput={onPromoChange}
                        />
                        <TextField
                            name='valor'
                            label='Monto'
                            type="number"
                            value={promoValue.valor}
                            onChange={onPromoChange}
                        />
                        <input
                            type="number"
                            disabled
                            name="subtotal"
                            ref={subtotalRef}
                            value={(promoValue.cant && promoValue.valor) ? promoValue.cant * promoValue.valor : 0}

                        />
                        <Button onClick={handleAddPromo}>
                            Agregar Promocion
                        </Button>
                    </div>
                )
            }

            {
                isAddingProduct && (
                    <ProductoForm
                        productos={productos}
                        action={handleAddProduct}
                    />
                )
            }

        </>
    )
}
