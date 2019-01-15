import React from "react"
import classNames from "classnames"

class Item extends React.Component {
  onClickPlus = (item) => {
    const { addItemToCart } = this.props
    addItemToCart(item)
  }

  onClickMinus = (id) => {
    const { removeItemFromCart } = this.props
    removeItemFromCart(id, false)
  }
  drag = (ev) => {
    console.log("dragging");
    const { item } = this.props
    ev.dataTransfer.setData(
      "text",
      JSON.stringify(item)
    );
  };
  render() {
    const { item, cartItems } = this.props
    const iteminCart = cartItems[item.sku]
    const classItem = classNames("item" , {
      "color-selected": iteminCart && iteminCart.quantity,
    })
    return (
      <li 
        className={classItem} draggable={true}
        onDragOver={ev => {
          ev.preventDefault();
        }}
        onDragEnter={ev => {
          ev.preventDefault();
        }}
        onDragStart={ev => this.drag(ev)}
      >
        <img src={item.p_img_url} alt="noimg"/>
        <p className="brand">{item.p_brand}</p>
        <p className="desc">{item.p_desc}</p>
        <li className="mrp-section">
          <p className="price-section">MRP&nbsp;:&nbsp;
          {item.dis_val && <span className="disc-price">Rs {item.mrp}</span> }  
            <span className="org-price">{item.sp}</span>
          </p>
          <p className="add-item-section">
            <span className="act-btn" onClick={() => this.onClickMinus(item.sku)}>-</span>
              <span className="quantity-sec">{iteminCart ? iteminCart.quantity: 0}</span>
            <span className="act-btn" onClick={() => this.onClickPlus(item)}>+</span>
          </p>
        </li>
    </li>
    )
  }
}

export default Item