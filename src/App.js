//https://disease.sh/v3/covid-19/countries

//https://disease.sh/v3/covid-19/all
import React,{useEffect, useState} from "react";
import './App.css';
import{MenuItem,Select,FormControl,Card, CardContent} from "@material-ui/core"
import Infobox from "./Infobox";
import Map from "./Map"
import Table from "./Table"
import {sortData} from "./util"
import LineGraph from "./LineGraph"
import "leaflet/dist/leaflet.css"
import {prettyPrintStat} from "./util"

function App() {
  const[caseType,setCasesType]=useState("cases")
const[countries,setCountries]=useState([]);
const[country,setCountry]=useState("worldwide");
const[countryInfo,setCountryInfo]=useState({})
const[tableData,setTableData]=useState([]);
const[mapCentre,setMapCentre]=useState({ lat: 34.80746, lng: -40.4796 });
const[mapZoom,setMapZoom]=useState(3)
const[mapCountries,setMapCountries]=useState([])

useEffect(()=>{
fetch("https://disease.sh/v3/covid-19/all")
.then(response=>response.json())
.then(data=>{
  setCountryInfo(data);
})
},[])


useEffect(()=>{

const getCountries=async()=>{
  await fetch('https://disease.sh/v3/covid-19/countries').then((response)=>response.json())
  .then((data)=>{
    const countries=data.map((props)=>(
      {
        name:props.country,
        value:props.countryInfo.iso2
      } ));

      const sortedData=sortData(data);
      setTableData(sortedData);
      setMapCountries(data)
setCountries(countries)
  })
}
getCountries();
},[])

const onCountryChange=async (event)=>{
const countryCode=event.target.value;
console.log(countryCode);
setCountry(countryCode);

const url= countryCode==="worldwide"?"https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url).then(response=>response.json())
.then(data =>{
  setCountry(countryCode);


  setCountryInfo(data);

setMapCentre([data.countryInfo.lat, data.countryInfo.long]);
setMapZoom(4)
})

}
console.log("kkk",countryInfo)


  return (
    <div className="app">
      <div className="app__left">
    <div className="app__header">

 

     <h1>Covid-19 Tracker</h1>
     <FormControl className="app_dropdown">
     <Select 
     variant="outlined"
       value={country}
       onChange={onCountryChange}
       
     >
      <MenuItem  value='worldwide'>WorldWide</MenuItem>
     {
       countries.map((props)=>(
         <MenuItem  value={props.value}>{props.name}</MenuItem>
       ))
     }
     

     {/* loop through all the countries  */}
     </Select>
     

     </FormControl>
     </div>
     <div className="app__stats">

        <Infobox
        isRed 
        active={caseType=="cases"}
        onClick={(e)=>setCasesType('cases')}
        title="Coronavirus cases"
        total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>

        <Infobox 
        
        active={caseType=="recovered"}
        onClick={(e)=>setCasesType('recovered')}
        title="Recovered" 
         total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>

        <Infobox 
        isRed
        active={caseType=="deaths"}
        onClick={(e)=>setCasesType('deaths')}
        title="Deaths"    
          total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>
     
     </div>

      


     <Map
     caseType={caseType}
      center={mapCentre}  zoom={mapZoom}
       countries={mapCountries}
     />
       </div>
       <Card className="app__right"> 
       <CardContent>
<h2>Live cases by Country</h2>

<Table countries={tableData}></Table>
<h3>WorlWide new {caseType}</h3>
<LineGraph className="app__graph"
caseType={caseType}
></LineGraph>
       
       
       </CardContent>
       </Card>
    </div>
  );
}

export default App;