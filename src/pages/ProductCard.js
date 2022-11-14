import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.scss'
import {useEffect, useState} from 'react'



function ProductCard({thumb,title,model,id}) {

    const [history,setHistory] = useState([]);

    useEffect(()=>{
        setHistory(JSON.parse(localStorage.getItem('history')));
    },[]);

    
    const addHistory = (thumb,title,model,id)=>{
        if(!history){
            const historyObject = [{
                "thumb": thumb,
                "title" : title,
                "model" : model,
                "id" : id
            }];
            localStorage.setItem("history", JSON.stringify(historyObject));
        }else{
            const historyObject = [...history,{
                "thumb": thumb,
                "title" : title,
                "model" : model,
                "id" : id
            }];
            localStorage.setItem("history", JSON.stringify(historyObject));
        }
            
    }

  return (
    <div className='productCard'>
        <img className='thumb' src={thumb} alt=''/>
        <div className='title'>{title}</div>
        <div className='bottomGroup'>
            <span>{model}</span>
            <Link to={`/product/${id}`} onClick={()=>addHistory(thumb,title,model,id)}><button>MORE</button></Link>
        </div>
    </div>  
  )
}

export default ProductCard