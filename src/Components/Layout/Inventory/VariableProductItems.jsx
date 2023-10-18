import { useEffect, useState } from "react"
import axios from "axios";
import { coinFormat } from "../../../Hooks/useTools";


const url = import.meta.env.VITE_WOOCOMMERCE_API_URL;
const username = import.meta.env.VITE_WORDPRESS_USER_NAME
const password = import.meta.env.VITE_WORDPRESS_USER_PASS
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export const VariableProductItems = ({ id, name, category, action }) => {

    const [variations, setVariations] = useState([])

    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${url}/products/${id}/variations`,
            headers: {
                'Authorization': basicAuth,
            }
        };


        axios.request(config)
            .then((response) => {
                setVariations(response.data)
                console.log(variations)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            {
                variations.map((variation) => (
                    <tr key={variation.id}>
                        <td>{variation.sku ? variation.sku : "N/A"}</td>
                        <td>{`${name} sabor ${variation.attributes[0]?.option}`}</td>
                        <td>{category}</td>
                        <td>{coinFormat(parseFloat(variation.regular_price))}</td>
                        <td></td>
                        <td>
                            <span
                                className="material-symbols-rounded text-gray-600 hover:text-green-900 cursor-pointer"
                                onClick={() => action(variation, name)}
                            >
                                playlist_add
                            </span>
                        </td>
                    </tr>
                ))
            }
        </>
    )
}
