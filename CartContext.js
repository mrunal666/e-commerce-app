import React, { createContext, useState } from "react";
import { getProduct } from "./services/ProductService";
export const CartContext = createContext();
export function CartProvider(props) {
  const [items, setItems] = useState([]);

  async function addItemToCart(id) {
    const product = await getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id == id);
      if (!item) {
        return [
          ...prevItems,
          {
            id,
            qty: 1,
            product,
            totalPrice: parseInt(product.price),
          },
        ];
      } else {
        return prevItems.map((item) => {
          if (item.id == id) {
            item.qty++;
            item.totalPrice += parseInt(product.price);
          }
          return item;
        });
      }
    });
  }
  function getItemsCount() {
    return items.reduce((sum, item) => sum + item.qty, 0);
  }

  function getTotalPrice() {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  return (
    <CartContext.Provider
      value={{ items, setItems, getItemsCount, addItemToCart, getTotalPrice }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
