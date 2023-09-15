import { coinFormat } from "../../Hooks/useTools"

export const TotalFolio = ({ order }) => {

    const { subtotal_productos, subtotal_promos, total } = order

    return (
        <>
            <p>Subtotal</p> <p><b>{coinFormat(subtotal_productos)}</b></p>
            <p>Descuento</p> <p><b>{`-${coinFormat(subtotal_promos)}`}</b></p>
            <h4>TOTAL</h4> <h4>{coinFormat(total)}</h4>
        </>
    )
}
