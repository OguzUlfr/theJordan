import React, { useEffect, useState } from 'react'

//Import CSS
import './Content.scss'
import 'react-toastify/dist/ReactToastify.css';

//Import Axios and Toastify Natification
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

//Import React Icons Icon
import {MdOutlineDeleteForever} from 'react-icons/md';
import {AiFillCloseSquare} from 'react-icons/ai';

function Products() {
    const [productData,setProductData] = useState();
    const [modalView,setModalView] = useState(false);
    const [preview,setPreview] = useState('https://i.ibb.co/Kj79cQm/Ads-z.png');
    const [images,setImages] = useState([]);
    const [imagesValue,setImagesValue] = useState();
    const [threed,setThreed] = useState([]);
    const [threedValue,setThreedValue] = useState();
    const [formData,setFormData] = useState({title:'',model:'',color:'',description:'',about:''});
    const [loader,setLoader] = useState(true);

    //Get All Product

    useEffect(()=>{
        setTimeout(()=>{
            axios.get('http://localhost:3004/products')
            .then(response => setProductData(response.data))
            .finally(setLoader(false));
        },2000);
    });

    //Image State Clear

    const clearForm = ()=> {
        setThreed([]);
        setImages([]);
    }

    //Input data set state

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    //Form submit && Product Add

    const submitForm = (e) => {
        e.preventDefault();
        const day = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        axios.post('http://localhost:3004/products',{
            title : formData.title,
            model : formData.model.toLocaleLowerCase().trim().split(" ").join("-"),
            about : formData.about,
            description : formData.description,
            date: `${day}-${month}-${year}`,
            color : formData.color,
            thumb : preview,
            images : images,
            threeD : threed
        })
        .then(response => {
            if(response.status === 201){
                toast.success('Product Add Complete');
                setModalView(false);
            }
        })
        .catch(error =>{
            toast.error(error.message);
        });
    }

    //Delete Product

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:3004/products/${id}`)
        .then(response => toast.info('Delete Complete'))
        .catch(error => toast.error(error.message))
    }

  return (
    <div className='products'>
        <h3 className='title'>Products</h3>

        <div className='topButtonBar'>
          <button className='addButton' onClick={()=>setModalView(true)}>ADD</button>
        </div>

        <div className='productList'>
            <span className="loader" style={{display : loader ? 'block' : 'none'}}></span>
            {productData &&
                productData.map(data => (
                    <div className='productListItem' key={data.id}>
                        <img src={data.thumb} alt=''/>
                        <div className='productTitle'>{data.title}</div>
                        <div className='productButtonGroup'>
                            <button>Detail</button>
                            <MdOutlineDeleteForever className='deleteButton' onClick={()=>deleteProduct(data.id)}/>
                        </div>
                    </div>
                ))
            }
        </div>

        <div className='productAddBox addBox' style={{display: modalView ? 'block' : 'none'}}>
            <div className='addCard'>
                <h3 className='cardTitle'>Product ADD</h3>
                    <form className='addForm' onSubmit={submitForm}>
                        <label className='inputBox'><span>Title</span><input name='title' onChange={handleChange}/></label>
                        <label className='inputBox'><span>Model</span><input name='model' onChange={handleChange}/></label>
                        <label className='inputBox'><span>Color</span><input name='color' onChange={handleChange}/></label>
                        <label className='inputBox'><span>Description</span><textarea name='descripton' onChange={handleChange}/></label>
                        <label className='inputBox'><span>About</span><textarea name='about' onChange={handleChange}/></label>
                        <label className='inputBox'><span>Thumb</span><input onChange={(e)=>setPreview(e.target.value)}/></label>
                        <div className='inputBox'>
                            <label className='inputBox'>
                            <span>Images</span>
                            <input onChange={(e)=>setImagesValue(e.target.value.trim())}/>
                            </label>
                            <button type='button' className='addButton' onClick={()=>setImages([...images,imagesValue])}>ADD</button>
                        </div>
                        <div className='inputBox'>
                            <label className='inputBox'>
                                <span>ThreeD</span>
                                <input  onChange={(e)=>setThreedValue(e.target.value.trim())}/>
                            </label>
                            <button type='button' className='addButton' onClick={()=>setThreed([...threed,threedValue])}>ADD</button>
                        </div>
                        <div><button type='reset' onClick={clearForm} className='clearButton'>Clear</button>
                        <button type='submit' className='submitButton'>Submit</button>
                        </div>
                    </form>

                    <div className='previewBox'>

                        <div className='thumbPrev'>
                            <img src={preview} alt=''/>
                        </div>

                        <div className='imagesList'>
                            {images&&
                                images.map((image,key) => (
                                    <img src={image} alt='' key={key}/>
                                ))
                            }
                        </div>

                        <div className='threeDList'>
                            {threed&&
                                threed.map((image,key) => (
                                    <img src={image} alt='' key={key}/>
                                ))
                            }
                        </div>
                    </div>
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

export default Products