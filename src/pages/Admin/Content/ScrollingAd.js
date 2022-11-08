import React, { useEffect, useState } from 'react'
import './Content.scss'
import {MdDeleteOutline} from 'react-icons/md'
import {AiFillCloseSquare} from 'react-icons/ai'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify' 

function ScrollingAd() {
  const [modalView,setModalView] = useState(false);
  const [loader,setLoader] = useState(true);
  const [adData,setAddData] = useState();
  const [adPreview,setAdPreview] = useState('https://i.ibb.co/cFHzFD6/Untitled-1.png');

  const submitAD = (e) => {
      e.preventDefault();
      axios.post('http://localhost:3004/carousel',{
        link:adPreview
      })
      .then(response => {
        toast.success('Scrolling Ad Add Complete')
        setModalView(false)
      })
      .catch(error => toast.error(error.message));
  }

  const deleteAd = (id) => {
    axios.delete(`http://localhost:3004/carousel/${id}`)
    .then(response => toast.info('Ad Delete Complete'))
    .catch(error => toast.error(error.message));
  }

  useEffect(()=>{
    setTimeout(()=>{
      axios.get('http://localhost:3004/carousel')
      .then(response => setAddData(response.data))
      .catch(error => toast.error(error.message))
      .finally(setLoader(false))
    },2000); 
  });

  return (
    <div className='ad'>
        <h3 className='title'>Scrolling AD</h3>

        <div className='topButtonBar'>
          <button className='addButton' onClick={()=>setModalView(true)}>ADD</button>
        </div>
        
        <div className='adList'>
        <span className="loader" style={{display : loader ? 'block' : 'none'}}></span>
        {adData &&
          adData.map(ad => (
            <div className='adListItem' key={ad.id}>
              <img src={ad.link} alt=''/>
              <MdDeleteOutline className='deleteButton' onClick={()=>deleteAd(ad.id)}/>
            </div>
          ))
        }
        </div>

        <div className='addBox' style={{display : modalView ? 'block' : 'none'}}>
            <div className='adCard'>
                <div className='previewImage' style={{backgroundImage : `url(${adPreview})`}}></div>
                <form className='adForm' onSubmit={submitAD}>
                  <input placeholder='Image Link' onChange={(e)=>setAdPreview(e.target.value)}/>
                  <button type='submit'>Submit</button>
                </form>
                <AiFillCloseSquare className='closeButton' onClick={()=>setModalView(false)}/>
            </div>
        </div>
        
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          />
    </div>
  )
}

export default ScrollingAd