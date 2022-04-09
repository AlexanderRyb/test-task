import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import { openModal } from "../../Redux/actions";

export class Container extends React.Component {
  constructor(props) {
    super(props);
    this.updateNameValue = this.updateNameValue.bind(this)
    this.state = {
      data: [],
      modalIsOpen: false,
      addModalIsOpen: false,
      modalContent: "",
      nameInputValue: "",
    };
  }
  openAddModal() {
    this.setState({
      addModalIsOpen: true,
    });
  }

  openModal(item) {
    console.log("item");
    console.log(item.name);
    // show element and blur the background
    let modalContent = (
      <div>
        <div
          className="close-window-button"
          onClick={() => this.closeModal(item)}
        >
          X
        </div>
        <div>{item.name}</div>
        <div>Weight: {item.weight}</div>
        <div>Count:{item.count}</div>
        <button className="remove-button">remove</button>
        <button className="edit-button">edit</button>
      </div>
    );
    this.setState({
      modalIsOpen: true,
      modalContent: modalContent,
    });
  }
  closeModal(item) {
    console.log(item);
    this.setState({
      modalIsOpen: false,
    });
  }
  closeSecondModal() {
    this.setState({
      addModalIsOpen: false,
    });
  }
  updateNameValue(event){
    this.setState({
      nameInputValue: event.target.value
    })
  }
  addProduct() {
    console.log(this.state.nameInputValue);
   var http = new XMLHttpRequest()
   var url = 'http://localhost:3001/products'
   http.open('POST', url, true)
   http.setRequestHeader('Content-type', 'application/json')      
   http.send(JSON.stringify({name: this.state.nameInputValue, weight: "200"}))
   let data = this.state.data;
   console.log(data)

   this.closeSecondModal()
   
  }
  componentDidMount() {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          data: json,
        });
      });
  }

  render() {
    // let text = JSON.stringify(this.state.data)
    let data = this.state.data;

    return (
      <div id="container">
        <div id="control-panel">
          <div
            className={
              this.state.addModalIsOpen === true
                ? "add-item-modal visible"
                : "add-item-modal invisible"
            }
          >
            <h1>Add product</h1>

            <label htmlFor="productName">Product name</label>
            <input
              type="text"
              name="productName"
              value={this.state.nameInputValue}
              onChange={this.updateNameValue}
            ></input>
            <button
              className="cancel-button"
              onClick={() => this.closeSecondModal()}
            >
              Cancel
            </button>

            <button
              className="confirm-button"
              onClick={() => this.addProduct()}
            >
              Confirm
            </button>
          </div>
          <div
            className={
              this.state.modalIsOpen === true
                ? "product-card-window visible"
                : "product-card-window invisible"
            }
          >
            {this.state.modalContent}
          </div>
          <button id="add-product-button" onClick={() => this.openAddModal()}>
            Add product
          </button>
        </div>

        <div id="items-container">
          {data.map((item) => (
            <div
              onClick={() => this.openModal(item)}
              className="item"
              key={item.id}
            >
              <div className="item-name">{item.name}</div>
              <img src={item.image} alt="item preview" />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    openModal: (item) => dispatch(openModal(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
