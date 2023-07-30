import React, { useState }  from "react";
import Header from "../components/Header";
import "../components/css/Main.css"
import DarkHoodie from '../components/images/dark_hoodie.png'
import WhiteShirt from '../components/images/white_shirt.png'
import WhiteShorts from '../components/images/white_shorts.png'
import { useFormik } from "formik";
import * as Yup from 'yup'
// document.body.style = 'background: #e0f9fb;';

export default function Merch() {
    function getDateTime() {
        var date = new Date();
        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        var sec  = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        var day  = date.getDate();
        day = (day < 10 ? "0" : "") + day;
        return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;
    
    }
    
    let currentDate = getDateTime();

    const [selects,setSelects] = useState();
    const [loading, setLoading] = useState(0)
    //Formiks Logics
    const formik = useFormik({
        initialValues: {
            date: {currentDate},
            name: '',
            email: '',
            item: 'LIFT Hoodie',
            size: 'Medium',
            tos: '',
        },
        
        //Validate Form
        validationSchema: Yup.object({
            name: Yup.string()
                .max(20,'Name must be 20 characters or less.')
                .required('Name is required'),
            email: Yup.string()
                .email("Invalid email address")
                .required('Email is required'),
            tos: Yup.array().required("Terms of service must be checked")
        }),

        //Submit Form
        onSubmit: (values) => {
            setLoading(1)
            const form = document.querySelector("#form")
            const modal = document.getElementById("success")
            const close = document.getElementById('close')
            close.addEventListener('click', () => {
                window.location.reload(false);
            })
            const submitButton = document.querySelector("#submit")
            const scriptURL = 'https://script.google.com/macros/s/AKfycbxuY9cgfn4M203y98HIX6_6ISE1ybv2MBP2kyJWQomVn2FFVTxF1TUkRpzGAWI5Gbhg/exec'
            
            form.addEventListener('submit', e => {
                submitButton.disabled = true
                e.preventDefault()
                let requestBody = new FormData(form)
                fetch(scriptURL, { method: 'POST', body: requestBody})
                .then(response => {
                    setLoading(0)
                    document.getElementById("success").showModal()
                    submitButton.disabled = false
                    console.log("submitted")
                    })
                .catch(error => {
                alert('Error!', error.message)
                    submitButton.disabled = false
            
                }
                )
            })
         
        },
        
    });
    return(
        <>
        <Header/>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossOrigin="anonymous"/>
        <main className="mainForm">
            <dialog  id="success">
                    <span id="close">&times;</span>
                    <h1 className="order-submitted">Your Order Has Been Submitted</h1>
                    <h2 className="order-time">The Order Will Take Around A Month To Ship</h2>
            </dialog>
            <form className="formSection" onSubmit={formik.handleSubmit} id="form">
                <div className="leftSideForm">
                    <h1 className="formTitle">LIFT Merch </h1>
                    {formik.values.item == null && <h3 className="formDesc">$39</h3>}
                    {formik.values.item == "LIFT Hoodie" && <h3 className="formDesc">$39</h3>}
                    {formik.values.item == "LIFT T-Shirt" && <h3 className="formDesc">$17</h3>}
                    {formik.values.item == "LIFT Shorts" && <h3 className="formDesc">$33</h3>}

                    <div className="formDiv">
                        <input 
                            type="hidden"
                            name="date" 
                            value={currentDate}
                        />

                         {/* Name Input Field */}
                         <div className="field">
                            <label className={formik.touched.name && formik.errors.name ? "error-label" : "label"} htmlFor="name">{formik.touched.name && formik.errors.name ? formik.errors.name : 'Name'}</label>
                            <input 
                                className="inputName" 
                                type="text" 
                                name="name" 
                                value = {formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Enter Your Name"
                                onBlur={formik.handleBlur}
                            />
                         </div>
                         
                         {/* Email Input Field */}
                         <div className="field">
                            <label className={formik.touched.email && formik.errors.email ? "error-label" : "label"} htmlFor="email">{formik.touched.email && formik.errors.email ? formik.errors.email : 'Email'}</label>
                            <input 
                                className="inputName" 
                                type="email" name="email" 
                                value = {formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter Your Email"
                                onBlur={formik.handleBlur}
                            />
                         </div>
                         {/* Item Input Field */}
                         <div className="field">
                            <label className="label" htmlFor="item">Item</label>
                            <select 
                                id = "item" 
                                name="item" 
                                className="inputName" 
                                value={formik.values.item} 
                                onChange={formik.handleChange}>
                                <option disabled hidden defaultValue>Select</option>
                                <option value="LIFT Hoodie">LIFT Hoodie</option>
                                <option value="LIFT T-Shirt">LIFT T-Shirt</option>
                                <option value="LIFT Shorts">LIFT Shorts</option>
                            </select>
                         </div>
                         {/* Size Input Field */}
                         <div className="field">
                            <label className="label" htmlFor="size">Size</label>
                            <select 
                                id = "size" 
                                name="size" 
                                className="inputName"
                                value={formik.values.size}
                                onChange={formik.handleChange}>
                                <option disabled hidden defaultValue>Select</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                                <option value="Extra Large">Extra Large</option>
                                <option value="Extra Extra Large">Extra Extra Large</option>
                            </select>
                         </div>
                    </div>
                    {/* Terms of Service Input Field */}
                    <div className="field">
                            <label className={formik.touched.tos && formik.errors.tos ? "error-label" : "label"} htmlFor="tos">{formik.touched.tos && formik.errors.tos ? formik.errors.tos: 'Terms of service'}</label>
                            <div className="terms">
                                <input 
                                    type="checkbox" 
                                    name="tos" 
                                    value='checked'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                                <p>I Agree On Receiving the LIFT Newsletter</p>
                            </div>
                    </div>
                    {loading == 0 && <button type="submit" id = "submit" className="submitButton">Submit</button>}
                    {loading == 1 && <button type="submit" id = "submit" className="loading-button"> <i class="fa fa-spinner fa-spin fa-xl" aria-hidden="true"></i>Loading...</button>}
                </div>
                <div className="itemImage">
                    {formik.values.item == null && <img src={DarkHoodie} className="clothingImage" alt="Black Hoodie With LIFT Logo"/>}
                    {formik.values.item == "LIFT Hoodie" && <img src={DarkHoodie} className="clothingImage" alt="Black Hoodie With LIFT Logo"/>}
                    {formik.values.item == "LIFT T-Shirt" && <img src={WhiteShirt} className="clothingImage" alt="White Shirt With LIFT Logo"/>}
                    {formik.values.item == "LIFT Shorts" && <img src={WhiteShorts} className="clothingImage" alt="White Shorts With LIFT Logo"/>}

                    
                </div>
            </form>
        </main>
        </>
    )
}