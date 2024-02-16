import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const HomeScreen = () => {
  const { data: products, isLoading, hasError } = useGetProductsQuery();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios.get('/api/products')
  //     setProducts(data);
  //   }

  //   fetchProducts()
  // }, [])

  return (
    <>
      {isLoading ? (
        <Loader />
      ): hasError ? (
        <Message variant='danger'>{hasError?.data?.message || hasError.error}</Message>
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}/>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
