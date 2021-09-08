/* eslint-disable */
import React, { useState, useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import  data from './data.js';
import './App.css';
import Detail from './Detail.js';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';

export let inventoryContext = React.createContext();

function App() {
  let [shoesData, changeShoesData] = useState(data);
  let [inventory, changeInventory] = useState([102222,11,12]);

  return (
    <div className={"App " + animation}>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Link to="/">React-Bootstrap</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <div className="background">
              <h1>20% Season Off</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam doloremque eum odio inventore quos voluptatibus numquam autem vero unde! Beatae asperiores, est sit quisquam quaerat magni soluta tempore earum ullam?
              </p>
              <p>
                <button className="primary">Learn More</button>
              </p>
          </div>
          <div className="container">
            <div className="row">
              {
                shoesData.map((el, idx)=> {
                  return <Card shoesData={shoesData[idx]} key={idx}/>
                })
              }
            </div>
            <button className="btn btn-primary" onClick={()=>{
              // 로딩중 UI show
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((result)=>{ 
              // 로딩중 UI hide 
                let copy = [...shoesData]; 
                changeShoesData( copy.concat(result.data) );
                //  또는 changeShoesData( [...shoesData, ...result.data] );
               })
              .catch(()=>{
              // 로딩중 UI hide 
                console.log('실패');
              })
            }}>더보기</button>

            {/* axios.post('서버URL', {id: 'codingapple', pw: '1234'}).then */}
          </div>
        </Route>

        <Route path="/detail/:id">
            <inventoryContext.Provider value={inventory}>
              <Detail shoesData={shoesData} inventory={inventory} changeInventory={changeInventory}/>
            </inventoryContext.Provider>
        </Route>

      </Switch>
    </div>
  );
}

function Card(props) {
  let inventory = useContext(inventoryContext);
  return (
    <div className="col-md-4">
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.shoesData.id+1)+".jpg"} width="100%"/>
      <h4>{ props.shoesData.title }</h4>
      <p>{ props.shoesData.content } & {props.shoesData.price}원</p>
    </div>
  )
}

export default App;
