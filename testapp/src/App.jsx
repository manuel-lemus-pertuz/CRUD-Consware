import  React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import swal from "sweetalert2";

const axios = require('axios');
const apiUrl = "http://localhost:1000/platos";

// FUNCIÓN PRINCIPAL
function App() {
  return (
    <div className="App">
      <h1 className="text-center">CRUD-SIMPLE RESTAURANTE!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<ShowList />} />
      </Routes>
    </div>
  );
}

// PAGINA DE INICIO
function Home() {
  
  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center">GESTIONAR MENÚ</h4>
          <div className="row">
            <div className="col-4"></div>
            <div className="col-4 text-center">
              <button className="btn btn-white" type="submit">
                <Link to="/about">Gestionar menú</Link>
              </button>
            </div>
            <div className="col-4"></div>
          </div>
      </div>
    </>
  );
}

// PAGINA PARA EJERCICO CRUD
function ShowList() {
  // Creando variables de estado a utilizar
  const [idPlato, setIdPlato] = useState(null);
  const [namePlato, setNamePlato] = useState("");
  const [descriptionPlato, setDescriptionPlato] = useState("");
  const [platos, setPlatos] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  // Función para cargar los platos de la DDBB
  async function fetchAll() {
    try {
      const config = {
        method: 'get',
        url: apiUrl,
      };
      const result = await axios(config);
      setPlatos(result.data.body)
      console.log('platos', platos)
    } catch (e) {
      console.log('e', e);
    }
  };

  // Función para crear nuevo plato
  async function createPlato(data) {
    try {
      const config = {
        method: 'post',
        url: `${apiUrl}/create`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data
      };
      const result = await axios(config);
      setPlatos(result.data.body)
      console.log('platos', platos)
    } catch (e) {
      console.log('e', e);
    } finally {
      fetchAll()
    }
  };

  // Función para eliminar plato por id
  async function eliminarPlato(id) {
    try {
      const config = {
        method: 'delete',
        url: `${apiUrl}/delete/${id}`,
        headers: { }
      };
      const result = await axios(config);
      setPlatos(result.data.body)
      console.log('platos', platos)
    } catch (e) {
      console.log('e', e);
    } finally {
      fetchAll()
    }
  };

  // Función para editar plato por id
  async function editarPlato(data, id) {
    try {
      const config = {
        method: 'put',
        url: `${apiUrl}/update/${id}`,
        headers: { 
          'Content-Type': 'application/json'
        },
        data
      };
      const result = await axios(config);
      setPlatos(result.data.body)
    } catch (e) {
      console.log('e', e);
    } finally {
      fetchAll();
    }
  };
  
  // Validación
  const validarPlato = (e) => {
    //Evita que procese el formulario con el evento get
    e.preventDefault();

    if (!namePlato.trim()) {
      swal.fire({
        title: "Nombre del plato requerido!",
        icon: "warning",
      })
      return
    }
    if (!descriptionPlato.trim()) {
      swal.fire({
        title: "Descripcion del plato requerida!",
        icon: "warning",
      })
      return
    }
    console.log("tarea",namePlato,descriptionPlato);

    // Almacenar datos del plato a crear
    const data = {
      name: namePlato,
      description: descriptionPlato,
    };

    // Evalua si existe id para crear o actualizar
    if (idPlato) {
      editarPlato(JSON.stringify(data), idPlato);
    } else {
      createPlato(JSON.stringify(data));
    }

    // Setear el formulario y variables de estado
    setDescriptionPlato("");
    setNamePlato("");
    setIdPlato(null);
    setModoEdicion(false);
  };

  // se ejecuta cada que cambia un componente
  useEffect(() => {
    // llamar a la función fetchAll
    fetchAll();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h4 className="text-center">GESTIÓN DE PLATOS</h4>
        <hr />
        <div className="row">
          <div className="col-4">
            {/* Evaluando si estamos en modo edición o no para TITULO */}
            { modoEdicion? (
              <h4 className="text-center">
                Editar Plato
              </h4>
            ) : (
              <h4 className="text-center">
                Crear Nuevo plato
              </h4>
            )}
            <form onSubmit={validarPlato}>
              <h6>Nombre del plato</h6>
              <input
                type="text"
                className="form-control mb-2"
                value={namePlato}
                onChange={(e) => setNamePlato(e.target.value)}
              />
              <h6 className="mt-3">Descripción del plato</h6>
              <input
                type="text-area"
                className="form-control mb-2"
                value={descriptionPlato}
                onChange={(e) => setDescriptionPlato(e.target.value)}
              />
              {/* Evaluando si estamos en modo edición o no para BOTTON */}
              { modoEdicion ? (
                <button className="btn btn-warning" type="submit">
                  Actualizar
                </button>
              ) : (
                <button className="btn btn-dark" type="submit">
                  Crear
                </button>
              )}
            </form>
          </div>
          <div className="col-8">
            <h4 className="text-center">
              Lista de tareas
            </h4>
            <ul className="list-group">
                {platos.length > 0 ? (
                  platos.map((dato, i) => (
                    <li className="list-group-item" key={i}>
                      <span  className="lead">{dato.name}</span>

                      <button
                        className="btn btn-danger btn-sm float-end mx-3"
                        onClick={() => {
                          eliminarPlato(dato.id);
                        }}
                      >
                        Eliminar
                      </button>

                      <button
                        className="btn btn-warning btn-sm float-end"
                        onClick={() => {
                          // Seteando con los datos del plato
                          setModoEdicion(true);
                          setNamePlato(dato.name);
                          setDescriptionPlato(dato.description);
                          setIdPlato(dato.id);
                        }}
                      >
                        Editar
                      </button>
                    </li>
                  ))
                ) : (
                  <span className="lead text-center">No existen aun registros de en el menú</span>
                )}
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <Link to="/">Volver al inicio</Link>
      </nav>
    </>
  );
}

export default App;
