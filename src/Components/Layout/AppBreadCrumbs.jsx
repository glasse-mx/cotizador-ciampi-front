import React from 'react'

export const AppBreadCrumbs = ({ nombrePagina = "pagina" }) => {
    return (
        <nav>
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
                <li className="text-sm leading-normal">
                    <p className="opacity-50 text-slate-700" >INICIO</p>
                </li>
                <li className="text-sm pl-2 capitalize leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']" aria-current="page">{nombrePagina}</li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">Dashboard</h6>
        </nav>
    )
}
