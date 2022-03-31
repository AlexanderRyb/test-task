import React from 'react'
import "./styles.css";


export default function Container () {
  const getData = async()=>{

    const res = await fetch("http://localhost:3001/products")
    const data = await res.json()
    console.log(data)
    return data
    
  }

  return (
   <div>
     <h2>test</h2>
     <button onClick={getData}>get data</button>
   </div>
  )
}

  
