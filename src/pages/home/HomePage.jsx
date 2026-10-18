import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import{ProductsGrid} from './ProductsGrid'
import "./HomePage.css";
import Header from "../../components/header";

export function HomePage({ cart ,loadCart}) {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
     axios.get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);
  return (
    <>
      <title>Ecommerce project</title>


      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
