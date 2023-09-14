import axios from "axios";
import { useEffect, useState } from "react";


/**
 * Retorna las Los Metodos de Pago y Bancos disponibles para un cliente
 * @returns {Array} paymentOptions
 * 
 */
export const usePaymentOptions = () => {

    const [paymentOptions, setPaymentOptions] = useState([]);

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
    }, []);

    return paymentOptions;
}