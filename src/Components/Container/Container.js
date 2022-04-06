import React from "react";
import "./styles.css";
import { connect } from "react-redux";
import { openModal } from "../../Redux/actions";

export class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalIsOpen: false,
    };
  }
  openModal(item) {
    console.log("item");
    console.log(item.name);
    // show element and blur the background
    this.setState({
      modalIsOpen:true
    })
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
              this.state.modalIsOpen == true
                ? "product-card-window visible"
                : "product-card-window invisible"
            }
          >
            <p>Item name</p>
            <p>item weight</p>
            <button>remove</button>
            <button>edit</button>
          </div>
          <button id="add-product-button">Add product</button>
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
