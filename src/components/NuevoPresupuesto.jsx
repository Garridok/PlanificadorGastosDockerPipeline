import { useState } from "react";
import Mensaje from "./Mensaje";


const NuevoPresupuesto = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!(presupuesto) || (presupuesto) < 0) {
      setMensaje('No es un presupuesto valido')
      return
    } 
    setMensaje('')
    setIsValidPresupuesto(true)
    
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra"> 
        
        <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label htmlFor="presupuesto">Definir Presupuesto</label>
                <input
                placeholder="Introduce el Presupuesto"
                id="presupuesto"
                className="nuevo-presupuesto"
                type="number" 
                value={presupuesto}
                onChange={e => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input 
            value="agregar"
            type="submit" />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    
    </div>
  )
}

export default NuevoPresupuesto