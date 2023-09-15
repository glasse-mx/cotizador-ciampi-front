import { Button } from "@mui/material"
import { PaymentItem } from "./PaymentItem"

export const SetleForm = ({ order, setOrder }) => {

    const initialVal = {
        paymentType: 0,
        amount: 0,
        bank: 0,
        reference: ''
    }

    const { detalles_anticipo } = order

    const handleAddAnticipo = () => {
        setOrder({ ...order, detalles_anticipo: [...detalles_anticipo, initialVal] })
    }

    const handleEditAnticipo = (e, index) => {
        const { name, value } = e.target
        const list = [...detalles_anticipo]
        list[index][name] = value
        setOrder({ ...order, detalles_anticipo: list })
    }

    const handleDeleteAnticipo = (index) => {
        const list = [...detalles_anticipo]
        list.splice(index, 1)
        setOrder({ ...order, detalles_anticipo: list })
    }



    return (
        <>
            <Button onClick={handleAddAnticipo}>
                <i className="fas fa-plus"></i> Agregar
            </Button>

            {
                detalles_anticipo && (
                    detalles_anticipo.map((item, index) =>
                        <PaymentItem
                            key={index}
                            index={index}
                            value={item}
                            onChange={handleEditAnticipo}
                            onDelete={handleDeleteAnticipo}
                        />
                    )
                )

            }

        </>
    )
}
