import React from 'react'

export const DescuentoForm = () => {

    return (
        <>
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
                    onChange={onPromoChange}
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
                    value={promoValue.subtotal}

                />
                <Button onClick={handleAddPromo}>
                    Agregar Promocion
                </Button>
            </div>
        </>
    )
}
