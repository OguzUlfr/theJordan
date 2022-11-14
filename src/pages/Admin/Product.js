import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios';
import LeftBar from './LeftBar'
import {MdPreview,MdOutlineDeleteForever} from 'react-icons/md'
import {IoClose} from 'react-icons/io5'
import './Admin.scss'



function Product() {
    const dataSchema = {title:'',model:'',about:'',description:'',color:''};
    const [modalView,setModalView]= useState(false);
    const [productData,setProductData] = useState();
    const [thumbnailPreview,setThumbnailPreview] = useState();
    const [formData,setFormData] = useState(dataSchema);
    const [productImages,setProductImages] = useState([]);
    const [threeDImages,setThreeDImages] = useState([]);

    const titleInput = useRef();
    const modelInput = useRef();
    const aboutInput = useRef();
    const descriptionInput = useRef();
    const colorInput = useRef();

    const getProduct = () => {
        axios.get('http://localhost:3004/products')
        .then(response => setProductData(response.data));
    }
    const thumbnailAdd = (e) =>{
        const formData = new FormData();
        formData.append("file",e.target.files[0]);
        formData.append("upload_preset","iwupafa5");
        axios.post("https://api.cloudinary.com/v1_1/dprblngc4/upload", formData)
        .then(response => setThumbnailPreview(response.data.url))
    }

    const productImageAdd = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            const formData = new FormData();
            formData.append("file",e.target.files[i]);
            formData.append("upload_preset","iwupafa5");
            axios.post("https://api.cloudinary.com/v1_1/dprblngc4/upload", formData)
            .then(response => setProductImages(productImages => [...productImages,response.data.url]))
          }
    }

    const threeDImageAdd = (e) => {
        for (var i = 0; i < e.target.files.length; i++) {
            const formData = new FormData();
            formData.append("file",e.target.files[i]);
            formData.append("upload_preset","iwupafa5");
            axios.post("https://api.cloudinary.com/v1_1/dprblngc4/upload", formData)
            .then(response => {
                setThreeDImages(threeDImages => [...threeDImages,response.data.url])
            });
        }
    }



    const handlechange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const submitForm = (e) => {
        e.preventDefault();

        const dates = new Date();
        const uploadDate = `${dates.getDate()}-${dates.getMonth()}-${dates.getFullYear()}`;

        axios.post("http://localhost:3004/products", {
            title: formData.title,
            model: formData.model,
            about: formData.about,
            description: formData.description,
            date: uploadDate,
            color: formData.color,
            thumb: thumbnailPreview,
            images: [thumbnailPreview,...productImages],
            threeD: threeDImages
        })
        .then(response => {
            toast.success("Product Add Added");
            closeModal();
            getProduct();
            }    
        )
        .catch(err => toast.error(err.message));
    }

    const deleteProduct = (id) => {
        const address = `http://localhost:3004/products/${id}`
        axios.delete(address)
        .then(response => {
            toast.info(`Product(${id}) Delete`);
            getProduct();
        });
    }

    useEffect(()=>{
        getProduct();
    },[]);

    const closeModal = () => {
        setModalView(false);
        setFormData(dataSchema);
        setThumbnailPreview();
        setProductImages([]);
        setThreeDImages([]);
        titleInput.current.value = '';
        modelInput.current.selectedIndex = 0;
        aboutInput.current.value = '';
        descriptionInput.current.value = '';
        colorInput.current.value = '';
    }

  return (
    <div className='adminBox'>
        <LeftBar/>
        <div className='contentBox'>
            <div className='title'>Products</div>
            <div className='topBar'>
                <button onClick={()=>setModalView(true)}>ADD</button>
            </div>
            <div className='productList'>
                {productData &&
                    productData.map(product => 
                    <div className='productBox' key={product.id}>
                        <img src={product.thumb} alt=''/>
                        <div className='title'>{product.title}</div>
                        <div className='buttonGroup'>
                            <Link to={`/product/${product.id}`}><button className='detail'><MdPreview className='buttonIcon'/>Detail</button></Link>
                            <button className='delete' onClick={()=>deleteProduct(product.id)}><MdOutlineDeleteForever className='buttonIcon'/>Delete</button>
                        </div>
                    </div>
                    )
                }
            </div>

            <div className='productModal' style={{display: modalView ? 'flex' : 'none'}}>
                <div className='productModalCard'>
                <IoClose className='closeButton' onClick={closeModal}/>
                <div className='modalTitle'>Product ADD</div>
                    <form onSubmit={submitForm}>
                        <div className='formLeft'>
                            <label className='titleInput'><span>Title</span><input type='text' ref={titleInput} name='title' onChange={(e)=>handlechange(e)}/></label>
                            <label className='modelInput'><span>Model</span>
                                <select defaultValue={'DEFAULT'} ref={modelInput} name='model' onChange={(e)=>handlechange(e)}>
                                    <option value='DEFAULT' disabled>Select Shoes Model</option>
                                    <option value='Air Jordan 1'>Air Jordan 1</option>
                                    <option value='Air Jordan 2'>Air Jordan 2</option>
                                    <option value='Air Jordan 3'>Air Jordan 3</option>
                                    <option value='Air Jordan 4'>Air Jordan 4</option>
                                    <option value='Air Jordan 5'>Air Jordan 5</option>
                                    <option value='Air Jordan 6'>Air Jordan 6</option>
                                </select>
                            </label>
                            <label className='descInput'><span>Description</span><textarea ref={descriptionInput} name='description' onChange={(e)=>handlechange(e)} rows='10' cols='31'/></label>
                            <label className='aboutInput'><span>About</span><textarea ref={aboutInput} name='about' onChange={(e)=>handlechange(e)} rows='10' cols='31'/></label>
                            <label className='colorInput'><span>Color</span><input ref={colorInput} name='color' onChange={(e)=>handlechange(e)} type='text'/></label>
                        </div>
                        <div className='formRight'>
                            <div className='thumbnail'>
                            <label>
                                <div className='thumbBack'>
                                        <input type='file' accept='image/*' onChange={(e)=>thumbnailAdd(e)}/>
                                        <img src='https://i.ibb.co/pjsHHjh/Untitled-1.png' alt='Select File'/>
                                </div>
                                <div className='thumbFront' style={{display : thumbnailPreview ? 'flex' : 'none'}}>
                                    <img src={thumbnailPreview} alt='preview'/>
                                </div>
                            </label>
                            </div>
                            <div className='productImage'>
                                <div className='addImage'>
                                    <label>
                                        <input type='file' accept='image/*' multiple onChange={(e)=>productImageAdd(e)}/>
                                    </label>
                                </div>
                                {productImages &&
                                    productImages.map((image,key) => 
                                        <img src={image} alt='' key={key}/>    
                                    )
                                }
                            </div>

                            <div className='threeD'>
                                <div className='addImage'>
                                    <label>
                                        <input type='file' accept='image/*' multiple onChange={(e)=>threeDImageAdd(e)}/>
                                    </label>
                                </div>
                                {threeDImages &&
                                    threeDImages.map((image,key) => 
                                        <img src={image} alt='' key={key}/>    
                                    )
                                }
                            </div>
                            <button type='submit' className='uploadButton'>Upload</button>
                        </div>
                    </form>
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

export default Product