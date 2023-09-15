import { Button, TextField } from "@mui/material"
import { useState } from "react"
import axios from "axios";

const url = import.meta.env.VITE_WOOCOMMERCE_API_URL;
const username = import.meta.env.VITE_WORDPRESS_USER_NAME
const password = import.meta.env.VITE_WORDPRESS_USER_PASS
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export const ProductoForm = ({ productos, action }) => {

    const [search, setSearch] = useState('')
    const [inventory, setInventory] = useState([])

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value)
    }

    const handleSearchProducts = (e) => {

        e.preventDefault()

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${url}/products?per_page=30&search=${search}`,
            headers: {
                'Authorization': basicAuth,
            }
        };


        axios.request(config)
            .then((response) => {
                setInventory(response.data)
                console.log(inventory)
            })
            .catch((error) => {
                console.log(error);
            });


    }

    return (
        <>
            <div className="flex justify-center">
                <form>
                    <TextField
                        id="search"
                        label="Buscar"
                        variant="outlined"
                        name="search"
                        type="search"
                        value={search}
                        onChange={handleSearchInputChange}
                    />
                    <Button type="submit" onClick={handleSearchProducts}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        Buscar
                    </Button>
                </form>
                <Button>
                    Navegar
                </Button>
            </div>

            {
                inventory.length > 0 ? (
                    <div className="">
                        <table>
                            <thead>
                                <tr>
                                    <th>SKU</th>
                                    <th>Articulo</th>
                                    <th>Categorias</th>
                                    <th>Precio Unit.</th>
                                    <th>Disp.</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inventory.map((product, index) => (
                                        <tr key={index}>
                                            <td>{product.sku}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                {product.categories[0].name}
                                            </td>
                                            <td>{product.price}</td>
                                            <td>
                                                {product.stock_status == 'instock'
                                                    ? (product.stock_quantity ? (
                                                        <span className="available">
                                                            {product.stock_quantity}
                                                        </span>
                                                    ) : (
                                                        <span className="unavailable">
                                                            DISPONIBLE
                                                        </span>
                                                    ))
                                                    : (
                                                        <span className="unavailable">
                                                            NO DISPONIBLE
                                                        </span>
                                                    )}
                                            </td>
                                            <td>
                                                <span
                                                    className="material-symbols-rounded text-gray-600 hover:text-green-900 cursor-pointer"
                                                    onClick={e => action(product)}
                                                >
                                                    playlist_add
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <p>No se encontraron productos</p>
                    </div>
                )
            }
        </>
    )
}
