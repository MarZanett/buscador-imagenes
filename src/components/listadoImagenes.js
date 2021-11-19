import React from 'react'
import Imagenes from "./imagen"

const ListadoImagenes = ({imagenes}) => {
    return (
        <div className="col-12 p-5 row">
            {imagenes.map(imagen =>(
                <Imagenes
                    key={imagen.id}
                    imagen={imagen}
                />
            ))}
        </div>
    )
}

export default ListadoImagenes
