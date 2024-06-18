import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import axios from 'axios';

import { Footer, Navbar } from "../components";
import ProductDetails from "./ProductDetails"; // Import the ProductDetails component

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState('');
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [showDetails, setShowDetails] = useState(); // State to manage details visibility

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);

      // Fetch product details from your API using Axios
      axios.get(`http://127.0.0.1:5000/product/getproduct/${id}`)
        .then((response) => {
          setProduct(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          setLoading(false);
        });

      // Fetch similar products from your API using Axios
      axios.get(`http://127.0.0.1:5000/product/getsimilar/${id}`)
        .then((response) => {
          setSimilarProducts(response.data);
          setLoading2(false);
        })
        .catch((error) => {
          console.error('Error fetching similar products:', error);
          setLoading2(false);
        });
    };

    getProduct();
  }, [id]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const Loading = () => {
    return (
      <>
        <div className="container my-5 py-2">
          <div className="row">
            <div className="col-md-6 py-3">
              <Skeleton height={400} width={400} />
            </div>
            <div className="col-md-6 py-5">
              <Skeleton height={30} width={250} />
              <Skeleton height={90} />
              <Skeleton height={40} width={70} />
              <Skeleton height={50} width={110} />
              <Skeleton height={120} />
              <Skeleton height={40} width={110} inline={true} />
              <Skeleton className="mx-3" height={40} width={110} />
            </div>
          </div>
        </div>
      </>
    );
    };

    const ShowProduct = () => {
      return (
        <>
          <div className="container my-5 py-2">
            <div className="row">
              <div className="col-md-6 col-sm-12 py-3">
                <img
                  className="img-fluid"
                  src={`http://localhost:5000/file/` + product.image}
                  alt={product.libelle}
                  width="400px"
                  height="400px"
                />
              </div>
              <div className="col-md-6 col-md-6 py-5">
                <h4 className="text-uppercase text-muted">{product.category}</h4>
                <h1 className="display-5">{product.libelle}</h1>
                <p className="lead">
                  {product.rating && product.rating.rate}{" "}
                  <i className="fa fa-star"></i>
                </p>
                <h3 className="display-6 my-4">${product.prix}</h3>
                <p className="lead">{product.description}</p>
                <div className="my-3">
                  <button
                    className="btn btn-outline-dark m-2" // Added m-2 class for margin
                    onClick={() => addProduct(product)}
                  >
                    Add to Cart
                  </button>
                  <Link to="/cart" className="btn btn-dark mx-2"> {/* Added mx-2 class for margin */}
                    Go to Cart
                  </Link>
                  
                  {/* Button to toggle details */}
                  <button className="btn btn-dark my-2" onClick={toggleDetails}> {/* Added my-2 class for margin */}
                    Show Details
                  </button>
    
                  {/* Display details when showDetails is true */}
                  {showDetails && <ProductDetails product={product} onClose={toggleDetails} />}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    };
    
    const ShowSimilarProduct = () => {
      return (
        <>
          <div className="py-4 my-4">
            <div className="d-flex flex-wrap justify-content-center">
              {similarProducts.map((item) => {
                return (
                  <div key={item.id} className="card mx-4 text-center mb-4">
                    <img
                      className="card-img-top p-3"
                      src={item.image}
                      alt="Card"
                      height={300}
                      width={300}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {item.libelle.substring(0, 15)}...
                      </h5>
                    </div>
                    <div className="card-body">
                      <Link
                        to={"/product/" + item.id}
                        className="btn btn-dark m-2" // Added m-2 class for margin
                      >
                        Buy Now
                      </Link>
                      <button
                        className="btn btn-dark m-2" // Added m-2 class for margin
                        onClick={() => addProduct(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      );
    };
    
    
    

    
  const Loading2 = () => {
    return (
      <>
        <div className="my-4 py-4">
          <div className="d-flex">
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
            <div className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          </div>
        </div>
      </>
    );  };



  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
           
              
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
