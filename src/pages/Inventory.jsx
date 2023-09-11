import { useEffect, useState } from "react"
import axios from "axios"

export const Inventory = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {

        const username = import.meta.env.VITE_WORDPRESS_USER_NAME
        const password = import.meta.env.VITE_WORDPRESS_USER_PASS
        const basicAuth = 'Basic ' + btoa(username + ':' + password)

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_WOOCOMMERCE_API_URL}/products/categories?per_page=30`,
            headers: {
                'Authorization': basicAuth
            }
        }

        axios.request(config)
            .then((response) => {
                setCategories(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    console.log(categories)


    return (
        <div className="w-full h-full px-6 pr-10 py-6 mx-auto">
            <h4>Inventario</h4>

            <div className="flex flex-wrap -mx-3">

                <h6>Maquinas</h6>
                <h6>Bases de Helado</h6>
                <h6>Conos de Helado</h6>

            </div>
        </div>
    )
}
