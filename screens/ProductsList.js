import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Product } from "../components/Product.js";
import { getProducts } from "../services/ProductService";
import axios from "axios";

export function ProductsList({ navigation }) {
  function renderProduct({ item: product }) {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate("ProductDetails", {
            productId: product.product_id,
          });
        }}
      />
    );
  }

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function FetchAllProducts() {
      setProducts(await getProducts());
    }
    FetchAllProducts();
  });

  return (
    <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.product_id}
      data={products}
      renderItem={renderProduct}
    />
  );
}
const styles = StyleSheet.create({
  productsList: {
    backgroundColor: "#eeeeee",
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
