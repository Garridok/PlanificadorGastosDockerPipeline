import Mensaje from "./Mensaje";
import { useState, useEffect } from "react"
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({setModal, animarModal,setAnimarModal, guardarGasto, gastosEditar,setGastosEditar}) => {

    const [mensaje, setMensaje] = useState('');

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('');
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('');

    useEffect(()=>{
        if(Object.keys(gastosEditar).length > 0){
            setNombre(gastosEditar.nombre)
            setCantidad(gastosEditar.cantidad)
            setCategoria(gastosEditar.categoria)
            setId(gastosEditar.id)
            setFecha(gastosEditar.fecha)
        } else {

        }
    },[])

    const ocultarModal = () => {
        setAnimarModal(false);
        setGastosEditar({});

        setTimeout(()=>{
            setModal(false);

        },500)

    }

    const handleSubmit = e => {
        e.preventDefault()

        if([nombre, categoria, cantidad].includes('')){
            setMensaje('Todos los campos son obligatorios')
            
            setTimeout(() => {
                setMensaje('')
            }, 3000);

            return
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
            src={CerrarBtn} 
            alt="cerrar ventana"
            onClick={ocultarModal} />
        </div>

        <form 
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
            <legend>{gastosEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>
                <input 
                id="nombre"
                type="text"
                placeholder="Nombre del gasto"
                value={nombre}
                onChange={ e=> setNombre(e.target.value) }
                />
            </div>

            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input 
                id="cantidad"
                type="number"
                placeholder="Dinero gastado"
                value={cantidad}
                onChange={ e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select
                 id="categoria"
                 value={categoria}
                 onChange={e => setCategoria(e.target.value)}
                 >
                    <option value="">--- Seleccione una Categoria ---</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>


            <input 

            type="submit" 
            value={gastosEditar.nombre ? "Editar Gasto" : "Agregar Gasto"}
            />
        </form>

    </div>
  )
}

export default Modal