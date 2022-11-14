import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import LeftBar from './LeftBar'

import {MdDeleteForever} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'
import {IoImagesOutline} from 'react-icons/io5'
import {TbClick} from 'react-icons/tb'
import {HiOutlineUpload} from 'react-icons/hi'

import './Admin.scss'

function Ad() {
  const [modalView,setModalView]= useState(false);
  const [uploadImage,setUploadImage] = useState();
  const [uploadPreview,setUploadPreview] = useState();
  const [adData,setAdData] = useState();

  const getProduct = () => {
    axios.get('http://localhost:3004/carousel')
    .then(response => setAdData(response.data))
  }
  
  useEffect(() => {
    getProduct()
  },[setAdData]);

  const closeModal = () => {
    setModalView(false);
    setUploadImage();
    setUploadPreview();
  }

  const imageSelect = (e) => {
    setUploadPreview(URL.createObjectURL(e.target.files[0]));
    setUploadImage(e.target.files[0]);
  }

  const deleteAd = (id) => {
    const addres = `http://localhost:3004/carousel/${id}`
    axios.delete(addres)
    .then(response => {
      toast.info(`Home Ad(${id}) Delete`);
      getProduct();
    });
  }

  const uploadAd = () => {
      const formData = new FormData();
      formData.append("file",uploadImage);
      formData.append("upload_preset","iwupafa5");
      axios.post("https://api.cloudinary.com/v1_1/dprblngc4/upload", formData)
      .then(response => {
        axios.post('http://localhost:3004/carousel',{
          link:response.data.url
        })
        .then(reponses => {
          if(reponses.status === 201){
            toast.success('Home Ad Added');
            closeModal();
            getProduct();
          }
        })
        .catch(error => toast.error(error.message));
      })
      .catch(err => console.log(err));
  }
  

  return (
    <div className='adminBox'>
      <LeftBar/>
      <div className='contentBox'>
          <div className='title'>Home AD</div>
          <div className='topBar'>
            <button onClick={()=>setModalView(true)}>ADD</button>
          </div>

          <div className='adList'>
            {adData &&
              adData.map(ad => (
                <div className='adCard' key={ad.id}>
                    <img src={ad.link} alt=''/>
                    <MdDeleteForever className='deleteButton' onClick={()=>deleteAd(ad.id)}/>
                </div>
              ))
            } 
          </div>

          <div className='adModal' style={{display: modalView ? 'flex' : 'none'}}>
            <div className='adModalCard'>
              <IoClose className='closeButton' onClick={closeModal}/>
              <label className='inputBox'>
                  <input type='file' onChange={(e)=>imageSelect(e)}/>
                  <div className='inputBack'>
                    <IoImagesOutline className='imageIcon'/>
                    <p>Upload Image</p>
                    <TbClick className='clickIcon'/>
                  </div>
                  <div className='inputFront' style={{display: uploadPreview ? 'flex' : 'none'}}>
                    <div className='imgBox' style={{backgroundImage: `url(${uploadPreview})`}}></div>
                    <button onClick={uploadAd}><HiOutlineUpload className='uploadIcon'/>Upload</button>
                  </div>
              </label>
            </div>
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

export default Ad