import React from 'react'
import "./Newitem.css";
import P1 from './P1.PNG'
export default function Newitem() {
  return (
    <div className="container">
    <div className="admin-product-form-container">
      <form method="post" enctype="multipart/form-data">
        <h3>add a new product</h3>
        <input
          type="text"
          placeholder="enter product name"
          name="product_name"
          className="box"
        />
        <input
          type="number"
          placeholder="enter product price"
          name="product_price"
          className="box"
        />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          name="product_image"
          className="box"
        />
        <input
          type="submit"
          className="btn"
          name="add_product"
          value="add product"
        />
      </form>
    </div>

    <div className="product-display">
      <table className="product-display-table">
        <thead>
          <tr>
            <th>product image</th>
            <th>product name</th>
            <th>product price</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <img src={P1} height="100" alt="" />
            </td>
            <td>CURIO RADICANS</td>
            <td>50$</td>
            <td>
              <a href="" className="btn">
                <i className="fas fa-edit"></i> edit{" "}
              </a>
              <a href="" className="btn">
                <i className="fas fa-trash"></i> delete{" "}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}










