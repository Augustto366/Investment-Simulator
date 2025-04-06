import React from 'react'
import * as XLSX from 'xlsx'


export default function ExportExcelBtn({ dadosExcel }) {

    const exportExcel = () => {

        if ( dadosExcel.capital === '' ||
            dadosExcel.taxa === '' ||
            dadosExcel.tempo === '') {
            alert('Por favor, faça a simulação primeiro')
            return
        }

        const dados = [
            {
                Capital: dadosExcel.capital,
                "Taxa (%)": dadosExcel.taxa,
                "Tempo (anos)": dadosExcel.tempo,
                "Valor Final": dadosExcel.resultado
            }
        ];

        

        const worksheet = XLSX.utils.json_to_sheet(dados);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Simulção');     

        XLSX.writeFile(workbook, 'simulacao.xlsx')
    }

    return (
        <button className='btn btn-success w-25 btn-fade' onClick={exportExcel}>
            Baixar planilha
        </button>
    )
}

