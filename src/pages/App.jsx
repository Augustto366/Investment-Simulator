import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import ExportExcelButton from "../components/Excel";


function App() {


  const inputCap = useRef()
  const inputTaxa = useRef()
  const inputYear = useRef()


  const [calcu, setCalcule] = useState(false)
  const [fini, setFini] = useState('')

  function calc(e) {
    e.preventDefault()

    setCalcule(true)
    

    const cap = inputCap.current.value
    const i = inputTaxa.current.value / 100
    const yer = inputYear.current.value

    const res = cap * Math.pow((1 + i), yer)

    setFini(res.toLocaleString('pt-BR', {
      style: "currency",
      currency: 'BRL'
    }));

  }

  return (
    <>
      <h1 className="mt-5 pincel">Faça a sua simulação aqui</h1>

      <div className="container h-100 w-75 mt-5 d-flex flex-column align-items-center gap-4 border p-5 deg rounded	">


        <form className="form-control w-100 p-3 border rounded shadow bg-light d-flex align-items-center justify-content-between">
          <div>
            <input className=" mb-3 p-2 w-50 form-control" type="number" name="cap" placeholder="Capital" ref={inputCap} />
            <input className="mb-3 p-2 w-50 form-control" type="number" name="taxa" placeholder="Taxa %" ref={inputTaxa} />
            <input className='mb-3 p-2 w-50 form-control' type="number" name='time' placeholder='Tempo em anos' ref={inputYear} />
            <button onClick={calc} className="btn btn-primary" type="button">Simular</button>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-between  gap-3"> 
          <p className="fs-6 w-75 p-fade">Faça sua simulação e receba uma planilha pronta para usar quando quiser</p>
          {calcu && <ExportExcelButton dadosExcel={{
           capital: inputCap.current?.value,
           taxa: inputTaxa.current?.value /100,
           tempo: inputYear.current?.value,
           resultado: fini
        }}/>}
          {!calcu ? <div /> : <div className=" w-25 bg-success text-white rounded p-3 btn-fade">Montante: {fini}</div>}
          </div>
        </form>

        <p className=" p-fade fs-5 my-auto">O calculo utilizado para simulação é o juros compostos: a * (1 + i) ^ t</p>
      </div>
    </>
  )
}

export default App
