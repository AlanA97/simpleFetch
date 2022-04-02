import './App.css';
import ProductCard from "./ProductCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Navbar, Container, Nav, NavDropdown, Carousel, Row} from 'react-bootstrap'
import axios from "axios";
import React, {useState, useEffect} from "react";

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
      const getProducts = async () => {
          await axios.get(`http://localhost:3004/products?_page=1&_limit=8`).then(res => {
              setItems(res.data);
          })
      }
    getProducts();
  }, [])

    const fetchProducts = async () => {
        await axios.get(`http://localhost:3004/products?_page=${page}&_limit=4`).then(res => {
            if(res.data.length < 4) {
                setHasMore(false)
            }
            setItems([...items, ...res.data]);
            setPage(page+1);
        })
    }

  return (
    <div className="App">
        <Navbar bg="light" expand="lg" sticky='top'>
            <Container>
                <Navbar.Brand href="#">Brand</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="#">About</Nav.Link>
                        <NavDropdown title="Contact" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">Viber</NavDropdown.Item>
                            <NavDropdown.Item href="#">LinkedIn</NavDropdown.Item>
                            <NavDropdown.Item href="#">Facebook</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://fakeimg.pl/1920x1080/?text=Test&font=lobster"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://fakeimg.pl/1920x1080/?text=World&font=lobster"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://fakeimg.pl/1920x1080/?text=Hello&font=lobster"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
      <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchProducts}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Container className='mt-5'>
              <h1 className='mb-5'>Products</h1>
              <Row sm={1} md={2} lg={4}>
                {items.map(product => {
                    return <ProductCard product={product}/>
                })}
              </Row>
          </Container>
      </InfiniteScroll>
    </div>
  );
}

export default App;
