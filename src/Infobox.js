import React from 'react'
import "./Infoboxx.css"

import{Card,CardContent,Typography} from "@material-ui/core"
function Infobox({title,cases,isRed,total,active,...props}) {
    return (
        
         <Card
         onClick={props.onClick}
        
         className={`infoBox ${active && "infoBox--selected"}
      }`}
          
          >
          
          
             <CardContent>
                 {/* title */}
                 <Typography color="textSecondary" className="infoBox__title">{title}</Typography>
                 {/* no of cases */}
                 <h2 className="infoBox__cases">{cases}</h2>
                 {/* total */}
                 <Typography  className="infoBox__total" color="textSecondary">{total} Total</Typography>
             </CardContent>
         </Card>   
       
    )
}

export default Infobox
