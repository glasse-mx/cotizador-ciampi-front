import React from 'react'

export const ReLogin = () => {
    return (
        <div
            id="modal"
            className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 hidden"
        >
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold">Modal Title</h2>
                <p>Contenido del modal.</p>
                <div className="mt-4">
                    {/*  Botón para cerrar el modal  */}
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        data-target="modal"
                    >
                        Cerrar Modal
                    </button>
                </div>
            </div>
        </div>
    )
}
