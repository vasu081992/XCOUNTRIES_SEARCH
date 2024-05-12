import React, { useEffect,useState,useRef } from "react"
import styles from "./Countries.module.css"
import "./Countries.css"

const Card = ({country})=>{

    return(

        <div className="countryCard">
        <img src={country.flags.png} className={styles.flag} alt={country.name.common}/>
        <p className={styles.title}>{country.name.common}</p>
        </div>
    )
}
const FetchCountries = () =>{

const [countries,setcountries] = useState([]);

const [searchText,setsearchText]=useState('')

const [debouncetext,setdebouncetext] = useState("")

const [searchcountries,setsearchcountries] = useState([])

const debounceSearch =(e,debouncetext)=>{

    if(debouncetext){
        clearTimeout(debouncetext)
        console.log("timeout cleared now",debouncetext)
    }
const searchText = e.target.value;
setsearchText(e.target.value)

let timer = setTimeout(()=>{

    console.log("inside time out",countries)
    console.log("inside time out",searchText)
  let filteredItems = countries.filter((country)=>country.name.common.toLowerCase().includes(searchText.toLowerCase()))
  setsearchcountries(filteredItems)
console.log("timer",timer)
},500)

setdebouncetext(timer)
}

useEffect(()=>{
let timer;
    if(timer){
        clearTimeout(timer)
        console.log("timeout cleared now")
    }
    


},[searchText])

const countriesFetch = async()=>{

    try{
     const fetchUrl = await fetch('https://restcountries.com/v3.1/all')
     if(!fetchUrl.ok){
        console.log("some error occured",fetchUrl.status)
     }
     const response = await fetchUrl.json()
     setcountries(response)
     setsearchcountries(response)
     console.log(response)

}
 catch(err){
console.log("error occured",err)
 }
}
// const countriesFetch = ()=>{
//     fetch('https://restcountries.com/v3.1/all')
//     .then((res)=>{
//     return res.json()
//     })
//     .then((data)=>{
//       setcountries(data)
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

useEffect(()=>{
    countriesFetch()
},[]) // RUNS USE EFFECT ONLY ONCE - ON PAGE LOAD

console.log("countries",countries)

  
return (
<> 
<input type="text" className={styles.search} value={searchText} onChange={(e)=>{debounceSearch(e,debouncetext)}} placeholder="Start typing the country you love...."></input>

<div className={styles.container}> 
    { searchcountries.length>0 && (
     searchcountries.map((country)=>(
     <Card country={country} />
     ))

         )
    }
       </div>
</>
)
}

export default FetchCountries