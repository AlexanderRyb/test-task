import React from 'react'
import "./styles.css";


export default class Container extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      items: [],
      data: []
    }
  }


  componentDidMount(){
    fetch(
      "http://localhost:3001/products"
    )
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        data: json
      })
    })
  }

  render() {
    let text = JSON.stringify(this.state.data)
    let data = this.state.data

    return (
      <div>
     <h2>{text}</h2>
     <button >get data</button>
     <p>
       {
         data.map((item)=> (
           <div key={item.id}>
             {item.name}
           </div>
         ))
       }
     </p>
   </div>
      )
  }
}
