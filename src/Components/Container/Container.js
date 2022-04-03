import React from 'react'
import "./styles.css";


export default class Container extends React.Component {


  constructor(props){
    super(props)
    this.state = {      
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
   // let text = JSON.stringify(this.state.data)
    let data = this.state.data

    return (
      <div id='container'>
        <div id='control-panel'>
        <button id='add-product-button'>Add product</button>

        </div>
    
    <div id='items-container'>
    {
         data.map((item)=> (
           <div className='item' key={item.id}>
             <div className='item-name'>
             {item.name}

             </div>
             <img src= {item.image} alt="item preview" />
           </div>
         ))
       }
     
    </div>
    
   </div>
      )
  }
}
