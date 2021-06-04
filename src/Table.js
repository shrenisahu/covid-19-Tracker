import React from 'react'
import "./Table.css"
import numeral from "numeral"
function Table({countries}) {
    return (
        <div className="table">
            { 
                countries.map((props)=>
                
                (
                  
                    <tr>
                        <td>{props.country}</td>
                        <td><strong>
                       {

                        numeral(props.cases).format("0,0")
                       }
                     
                        
                        </strong></td>
                    </tr>
                ))
                }
            
            ll
        </div>
    )
}

export default Table
