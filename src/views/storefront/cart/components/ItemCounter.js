import React, { useEffect, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { updateCartURL } from 'Redux/ConsumerRedux/Cart/CartRedux';
import axios from 'axios';

const ItemCounter = ({ defVal = 0 , data}) => {
  console.log(data,"dfsfassadadsad")
  const dispatch = useDispatch()
  const [value, setValue] = useState(parseInt(defVal, 10));
  const [btndisabl, setBtnDisabl]=useState(false)
  const [suc,setSuc] = useState(false);
console.log(value,"adfadfzxczxczxasfafsa")
  const onInput = (event) => {
    setValue(event.target.value || 0);
  };

  const spinUp = () => {
    setValue(parseInt(typeof value === 'number' ? value : 0, 10) + 1);
  };

  const spinDown = () => {
    if(value===1){
      setValue(1)
    }
    else{
      setValue(parseInt(typeof value === 'number' ? value : 0, 10) - 1);
    }
   
  };




//   const [ip, setIP] = useState('');
// console.log(ip,"dsfsdfdsfdsfsd")
// const getData = async () => {
//   const res = await axios.get('https://ipapi.co/json/')
//   console.log(res.data);
//   setIP(res.data.ip)
// }

// useEffect( () => {
//   getData()
// }, [])
  





  const updateCart = () => {

    const payload = {
      "uuid" :data && data.uuid,
      "quantity" : value,
    } 
    dispatch(updateCartURL(payload))
    setSuc(true)
   
}

useEffect(()=>{
  if(data)
  updateCart()
},[value])
  
  return (
    <InputGroup className="spinner sw-11">
      <InputGroup.Text id="basic-addon1">
        <button type="button" className="spin-down single px-2" onClick={spinDown}  disabled={btndisabl}>
          -
        </button>
      </InputGroup.Text>
      <Form.Control value={value} onInput={onInput} placeholder="Count" className="text-center" />
      <InputGroup.Text id="basic-addon2">
        <button type="button" className="spin-up single px-2" onClick={spinUp}>
          +
        </button>
      </InputGroup.Text>
    </InputGroup>
  );
};

export default ItemCounter;
