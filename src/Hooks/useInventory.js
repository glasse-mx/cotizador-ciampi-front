import { useEffect, useState } from "react";
import axios from "axios";

/**
 * Variables para consultas
 */
const url = import.meta.env.VITE_WOOCOMMERCE_API_URL;
const username = import.meta.env.VITE_WORDPRESS_USER_NAME
const password = import.meta.env.VITE_WORDPRESS_USER_PASS
const basicAuth = 'Basic ' + btoa(username + ':' + password);



/**
 * Obtiene las categorias de los productos desde Woocommerce
 * 
 * @returns {Array} categories
 */

export const getCategories = () => {

    const [categories, setCategories] = useState([]);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url}/products/categories?per_page=30`,
        headers: {
            'Authorization': basicAuth
        }
    }

    useEffect(() => {
        axios.request(config)
        .then((response) => {
            setCategories(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [])

    return [categories]
}

export const parentCategories = (categories) => {
    const parents = categories.filter(category => category.parent == 0)
    return parents
}


/**
 * Obtiene todos los productos basado en la categoria activa, la pagina activa, si estan en 
 * oferta y el orden desde Woocommerce
 * 
 * @param {int} activeCategory 
 * @param {int} activePage 
 * @param {boolean} isOnSale 
 * @param {string} orderBy 
 * @returns Array de Productos
 * @returns Cantidad de paginas
 * 
**/

export const handleLoadProducts = (activeCategory = 0, activePage = 1, isOnSale = false, orderBy = 'default') => {

    let order = ''
    const [products, setProducts] = useState([])
    const [allPages, setAllPages] = useState(0)

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

    useEffect(() => {
        axios.request(config)
            .then((response) => {
                setProducts(response.data)
                setAllPages(response.headers['x-wp-totalpages'])
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    
    return [products, allPages]

}

export const handleSearchProducts = (searchTerm = '') => {

    const [products, setProducts] = useState([])

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${url}/products?per_page=60&search=${searchTerm}`,
        headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        axios.request(config)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return [products]
}