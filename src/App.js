import React, { useState, useEffect } from "react";
import Formulario from "./components/formulario";
import ListadoImagenes from "./components/listadoImagenes";

function App() {
  //state de la app
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarApi = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 12;
      const key = "24408031-84d0e5a672f63400a4058b222";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //calcular total paginas

      const calcularPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularPaginas);

      //scroll up 

        const jumbotron = document.querySelector(".jumbotron")
        jumbotron.scrollIntoView({behavior: "smooth"});
    };
    consultarApi();
  }, [busqueda,paginaActual]);

  //definir la pagina anterior
  const defPaginaAnterior = () => {
    const nuevaPagActual = paginaActual - 1;

    if (nuevaPagActual === 0) return;
    guardarActual(nuevaPagActual);
  };

  //difinir la pagina Siguiente
  const defPaginaSiguiente = () => {
    const nuevaPagActual = paginaActual + 1;

    if (nuevaPagActual > totalPaginas) return;
    guardarActual(nuevaPagActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">

      {paginaActual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={defPaginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaActual === totalPaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={defPaginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      
        <ListadoImagenes imagenes={imagenes} />

        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={defPaginaAnterior}
          >
            &laquo; Anterior
          </button>
        )}

        {paginaActual === totalPaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={defPaginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
