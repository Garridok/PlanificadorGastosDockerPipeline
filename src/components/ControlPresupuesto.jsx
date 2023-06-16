import propTypes from "prop-types";
import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto= ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const [disponible, setDisponible]= useState(0);
  const [gastado, setGastado]= useState(0);

  useEffect(()=>{
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado
    setGastado(totalGastado);
    setDisponible(totalDisponible)

    setTimeout(() =>{
      const nuevoPorcentaje = ( ((presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
      setPorcentaje(nuevoPorcentaje)
    },1500)
    },[gastos])

  const formatearCantidad = (cantidad) => {
   return cantidad.toLocaleString('en-US', 
    {
      style: 'currency', 
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('Reiniciamos y borramos todo?')
    
    if(resultado){
      setGastos([]);
      setPresupuesto(0);
      setIsValidPresupuesto(false)
    }
  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
          })}
          value={porcentaje}
          text={`${porcentaje}% Gastado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button 
        className="reset-app"
        type="button"
        onClick={handleResetApp}
        >
          Resetear App
        </button>
          <p>
            <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
          </p>
          <p className={`${disponible < 0 ? 'negativo' : ''}`}>
            <span>Disponible: </span>{formatearCantidad(disponible)}
          </p>
          <p>
            <span>Gastado: </span>{formatearCantidad(gastado)}
          </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto