import axios from 'axios'
import { useState } from 'react'
import { getCategories } from '../Hooks/useInventory'
import { ItemCard, InventorySidebar } from '../Components/Layout/Inventory';
import '../Components/Layout/Inventory/Inventory.css'

const url = import.meta.env.VITE_WOOCOMMERCE_API_URL;
const username = import.meta.env.VITE_WORDPRESS_USER_NAME
const password = import.meta.env.VITE_WORDPRESS_USER_PASS
const basicAuth = 'Basic ' + btoa(username + ':' + password);

export const Inventory = () => {

    const [products, setProducts] = useState([])
    const [allPages, setAllPages] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [activeCategory, setActiveCategory] = useState(0)
    const [activePage, setActivePage] = useState(1)

    const [categories] = getCategories()


    /**
     * 
     * @param {int} activeCategory 
     * @param {int} activePage 
     * @param {boolean} isOnSale 
     * @param {string} orderBy 
     */
    const handleLoadProducts = async (activeCategory = 0, activePage = 1, isOnSale = false, orderBy = 'default') => {

        let order = ''

        switch (orderBy) {
            case 'lowerPrice':
                order = `orderby=price&order=asc`
                break
            case 'higherPrice':
                order = `orderby=price&order=desc`
                break

            default:
                order = `order=asc`
        }

        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${url}/products?per_page=12&${order}${(activeCategory != 0) ? `&category=${activeCategory}` : ''}${activePage != 1 ? `&page=${activePage}` : ''}`,
            headers: {
                'Authorization': basicAuth,
                'Content-Type': 'application/json',
            }
        }

        try {
            const response = await axios.request(config)
            setProducts(response.data)
            setAllPages(response.headers['x-wp-totalpages'])
            setIsLoading(false)
            setActiveCategory(activeCategory)
            setActivePage(activePage)
        } catch {
            console.error('Error de conexion')
        }

    }

    const handleSelectCategory = (e) => {
        handleLoadProducts(e.target.value, activePage)
        console.log(products)
    }


    return (
        <div className="w-full h-full px-6 pr-10 py-6 mx-auto flex">
            <InventorySidebar
                categories={categories}
                onSelect={handleSelectCategory}
                activeCategory={activeCategory}
            />
            <div className="inventoryContent">
                <div className="inventoryContent__header">
                    {
                        (products.length > 0) ?
                            products.map((product, index) => (
                                <ItemCard
                                    key={index}
                                    product={product}
                                />
                            ))
                            : (
                                <div className="no_selected">
                                    <h3>Seleccione una categoria</h3>
                                </div>
                            )

                    }
                </div>
            </div>
        </div>
    )
}
