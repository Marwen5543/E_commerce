import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from 'axios'; 
import { Link } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  }
  
  const ShowProducts = () => {
    const filteredProducts = selectedCategory === 'All' ? data : data.filter((item) => item.category === selectedCategory);
  
    const [produit, setProduit] = useState([]);

    useEffect(() => {
      // Fetch product data from your Node.js API
      axios.get('http://127.0.0.1:5000/product/getall')
      
        .then((response) => setProduit(response.data))
        .catch((error) => console.error('Error fetching products:', error));
    }, []);
    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setSelectedCategory('All')}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setSelectedCategory('jewelery')}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setSelectedCategory('electronics')}>Electronics</button>
        </div>

        {produit.map((produit) => {
          return (
            <div id={produit.id_produit} key={produit.id_produit} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
              <div className="card text-center h-100" key={produit.id_produit}>
                <img
                  className="card-img-top p-3"
                  src={`http://localhost:5000/file/`+produit.image}
                  alt="Image"
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {produit.libelle.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {produit.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {produit.prix}</li>
                </ul>
                <div className="card-body">
                  <Link to={"/Product/" + produit.id_produit} className="btn btn-dark m-1">
                    See Details
                  </Link>
                  <button className="btn btn-dark m-1" onClick={() => addProduct(produit)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
