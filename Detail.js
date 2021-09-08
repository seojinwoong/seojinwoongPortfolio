import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './Detail.scss';
import { inventoryContext } from './App';
import { Nav } from 'react-bootstrap';

function Detail(props) {
    let inventory = useContext(inventoryContext); 
    let [modal, changeModal] = useState(true);
    let [inputTest, inputTestFn] = useState('');
    let [activeTab, changeActiveTab] = useState(0);
    let [aniSwitch, changeAni] = useState(false);

    useEffect(()=>{
      console.log('안녕');
    },[inputTest]);
    
    let history = useHistory(); 
    let { id } = useParams();
    let resultData = props.shoesData.find((el) => {
      return el.id == id;
    });
    if (!resultData) {
      alert('해당하는 상품은 존재하지 않습니다.');
      history.push("/");
      return false;
    }

    return (
      <div className="container">
        <p className="color-red">안녕</p>
        { inputTest }
        <input type="text" onChange={(e)=>{ inputTestFn(e.target.value) }}/>
        { inventory }
        {
          modal === true
          ? (<div className="alert-modal">
              <p>재고가 얼마남지 않았습니다.</p>
            </div>)
          : null
        }

        <Info inventory={props.inventory}/>

        <div className="row">
          <div className="col-md-6">
            <img src={"https://codingapple1.github.io/shop/shoes"+(props.shoesData[id].id+1)+".jpg"} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{ resultData.title }</h4>
            <p>{ resultData.content }</p>
            <p>{ resultData.price }원</p>
            <button className="btn btn-danger" onClick={()=>{
              props.changeInventory([9,10,11]);
            }}>주문하기</button> 
            <button className="btn btn-primary" onClick={()=>{
              history.push('/');
            }}>뒤로가기</button> 
          </div>
        </div>
        
        <Nav className="mt-5" variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link eventKey="link-0" onClick={()=>{ changeAni(false); changeActiveTab(0) }}>Option 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1" onClick={()=>{ changeAni(false); changeActiveTab(1) }}>Option 2</Nav.Link>
          </Nav.Item>
        </Nav>
        <CSSTransition in={aniSwitch} classNames="wow" timeout={500}>
          <TabContent activeTab={activeTab} changeAni={changeAni}/>
        </CSSTransition>
      </div> 
    )
  }

  function TabContent(props) {
    useEffect(()=>{
      props.changeAni(true);
    });
    if (props.activeTab == 0) {
      return <div>0번째 내용입니다.</div>
    } else if (props.activeTab == 1) {
      return <div>1번째 내용입니다.</div>
    } else if (props.activeTab == 2) {
      return <div>2번째 내용입니다.</div>
    }
  } 

  function Info(props) {
    return (
      <p>재고 : {props.inventory[0]}</p>
    )
  }
  export default Detail
