import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

export const PaymentItem = () => {

    const [paymentOptions, setPaymentOptions] = useState([])

    const [options, setOptions] = useState({
        paymentType: '',
        amount: '',
        bank: '',
        reference: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setOptions({ ...options, [name]: value })
    }


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND_BASE_URL}/payment/options`,
            headers: {}
        };

        axios.request(config)
            .then((response) => {
                setPaymentOptions(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const { paymentTypes, banks } = paymentOptions || null
    // console.log(paymentTypes)


    return (
        <div className="paymenteItem">
            <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="paymentType">Metodo de Pago</InputLabel>
                <Select
                    labelId="paymentType"
                    id="paymentType"
                    name='paymentType'
                    value={options.paymentType}
                    label="Seleccione Metodo de Pago"
                    onChange={handleInputChange}
                >
                    {paymentTypes && paymentTypes.map((paymentOption) => (
                        <MenuItem key={paymentOption.id} value={paymentOption.id}>{paymentOption.value}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                variant='outlined'
                label='Monto'
                type='number'
                name='amount'
                value={options.amount}
                onChange={handleInputChange}
                required
            />

            <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="bank">Banco</InputLabel>
                <Select
                    labelId="bank"
                    id="bank"
                    value={options.bank}
                    label="Seleccione Banco"
                    name='bank'
                    onChange={handleInputChange}

                >
                    {banks && banks.map((bank) => (
                        <MenuItem key={bank.id} value={bank.id}>{bank.bank}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                variant='outlined'
                label='Referencia'
                name='reference'
                value={options.reference}
                onChange={handleInputChange}
                required
            />
        </div>
    )
}
