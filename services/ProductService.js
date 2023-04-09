import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://192.168.29.248:8080/api/products");
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getProduct = async (productId) => {
  try {
    const response = await axios.get(
      "http://192.168.29.248:8080/api/product/" + productId
    );
    // console.log(, "data");
    return response.data.pop();
  } catch (error) {
    console.error(error);
    return error;
  }
};
