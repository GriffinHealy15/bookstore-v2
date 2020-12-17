import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AmplifyAuthenticator, AmplifyConfirmSignIn, AmplifySignIn, AmplifySignInButton, AmplifySignOut } from '@aws-amplify/ui-react';
import { createBookType } from '../api/mutations'
import config from '../aws-exports'
import { Auth } from 'aws-amplify';
import { render } from '@testing-library/react';
import { Link, Route } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faHome, faShoppingCart, faShoppingBasket, faTv} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { FiVolume1 } from 'react-icons/fi';
import { BookOrderContext } from "../context/user_orders";

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config

var userName = 'User';
var email = '';
var phoneNumber = '';
var hasBeenPushedToAccount = false;
var signedIn = false;
var isAdmin = false;

// Promise Function. then resolves function
const GetInfo = async () => {
    return Auth.currentUserInfo().then(function(result) {
        return result;
    });
}

const RInfo = () => {
    const history = useHistory();
    // Promise Function
    try {
        GetInfo().then(function(item) {
            if (item != null) {
            try {
            userName = item.username;
            email = item.attributes.email;
            phoneNumber = item.attributes.phone_number;
            signedIn = true;
            if (userName == "Admin") {
                isAdmin = true;
            }
            } catch {
            if (signedIn == false) {
            userName = "UserNameTemp"
            console.log(userName);
            email = "tempEmail@gmail.com"
            phoneNumber = "1111111111"
            }
            else if (isAdmin == true) {
                userName = "Admin";
            }
            }
            if (hasBeenPushedToAccount == false) {
            history.push("/pushaccount");
            }
            hasBeenPushedToAccount = true;
            }
            else userName = 'User';
       })
    } catch (error) {
        
    }

    return Account();
} 

const Account = () => {
    // // Promise Function
    // try {
    //     GetInfo().then(function(item) {
    //         if (item != null) {
    //         userName = item.username;
    //         console.log(userName);
    //         }
    //         else userName = 'User';
    //    })
    // } catch (error) {
        
    // }

    const { userorders } = useContext(BookOrderContext);
    // console.log(userorders);
    const history = useHistory();
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", image: "", video: "", author: "", price: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        var overlay2 = document.getElementById('overlay2');
        overlay2.style.display = "inline";

        try {
            if (!bookDetails.title || !bookDetails.price) return
            await API.graphql(graphqlOperation(createBookType, { input: bookDetails }))
            setBookDetails({ title: "", description: "", image: "", video: "", author: "", price: "" })
            console.log("SUCCESFULLY CREATED PRODUCT");
            window.location.reload();
        } catch (err) {
            console.log('error creating todo:', err)
        }
    }

    const handleImageUpload = async (e) => {
        e.preventDefault();

        var overlay = document.getElementById('overlay1');
        overlay.style.display = "inline";
        var ImageUpload = document.getElementById('uploadImage');
        ImageUpload.hidden = true;

        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with private access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const image = await Storage.get(key, { level: 'public' })
            setImage(image);
            setBookDetails({ ...bookDetails, image: url });
            var videoUploaded = document.getElementById('uploadedImage');
            videoUploaded.style.visibility = 'visible';
            overlay.style.display = "none";
        } catch (err) {
            console.log(err);
        }
    }

    const handleVideoUpload = async (e) => {
        e.preventDefault();
        
        var overlay = document.getElementById('overlay');
        overlay.style.display = "inline";
        var VideoUpload = document.getElementById('uploadVideo1');
        VideoUpload.hidden = true;

        const file = e.target.files[0];
        const extension = file.name.split(".")[1];
        const name = file.name.split(".")[0];
        const key = `images/${uuidv4()}${name}.${extension}`;
        const url = `https://${bucket}.s3.${region}.amazonaws.com/public/${key}`
        try {
            // Upload the file to s3 with private access level. 
            await Storage.put(key, file, {
                level: 'public',
                contentType: file.type
            });
            // Retrieve the uploaded file to display
            const video = await Storage.get(key, { level: 'public' })
            setVideo(video);
            setBookDetails({ ...bookDetails, video: url });
            var videoUploaded = document.getElementById('uploadedVideo');
            videoUploaded.style.visibility = 'visible';
            overlay.style.display = "none";
        } catch (err) {
            console.log(err);
        }
    }

    if (userName == "Admin") {
    return (
        <section className="admin-wrapper">
            <AmplifyAuthenticator>
                <section>
                <h1 id="overlay2" className="overlay"> 
                        <div className="bgUV">Creating Product...</div>
                </h1>
                <h1 className="book-dtails">Welcome {userName}</h1>
                <h3 className="book-dtails">Email: {email}</h3>
                <h3 className="book-dtails">Phone #: {phoneNumber}</h3>
                <body id="customBlock"></body>
                    <header className="form-header">
                        <h3>Add New Product</h3>
                        <h1 id="overlay" className="overlay"> 
                        <div className="bgUV">Uploading Video...</div>
                        </h1>
                        <h1 id="overlay1" className="overlay"> 
                        <div className="bgUV">Uploading Image...</div>
                        </h1>
                        <AmplifySignOut></AmplifySignOut>
                    </header>
                    <form className="form-wrapper" onSubmit={handleSubmit}>
                    <div className="form-image">
                        <div id="uploadImage" className="uploadImage">Upload Product Image</div>
                        <div id="uploadedImage" className="uploadedImage">Successfully Uploaded Image</div>
                            {image ? <img className="image-preview" src={image} alt="" /> : <input id="addImageButton"
                                type="file"
                                accept="image/jpg"
                                onChange={(e) => handleImageUpload(e)} />}
                        </div>
                        
                        <div className="form-image">
                            <div id= "uploadVideo1" className="uploadVideo">Upload Product Video</div>
                            <div id="uploadedVideo" className="uploadedVideo">Successfully Uploaded Video</div>
                            {video ? <video className="image-preview1" src={video}/> : <input id="addVideoButton"
                                type="file"
                                accept="video/mp4"
                                onChange={(e) => handleVideoUpload(e)} />}
                        </div>

                        <div className="form-fields">
                            <div className="title-form">
                                <p><label htmlFor="title">Product Name</label></p>
                                <p><input className="inputs"
                                    name="email"
                                    type="title"
                                    placeholder="Type the name of the product"
                                    onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="description-form">
                                <p><label htmlFor="description">Product Description</label></p>
                                <p><textarea className="inputs"
                                    name="description"
                                    type="text"
                                    rows="8"
                                    placeholder="Type the description of the product"
                                    onChange={(e) => setBookDetails({ ...bookDetails, description: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="author-form">
                                <p><label htmlFor="author">Company</label></p>
                                <p><input className="inputs"
                                    name="author"
                                    type="text"
                                    placeholder="Type the company"
                                    onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })}
                                    required
                                /></p>
                            </div>
                            <div className="price-form">
                                <p><label htmlFor="price">Price ($$)</label>
                                    <input className="inputs"
                                        name="price"
                                        type="text"
                                        placeholder="What is the Price of the product (USD)"
                                        onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })}
                                        required
                                    /></p>
                            </div>
                            <div className="featured-form">
                                <p><label>Display on Featured Page?</label>
                                    <input type="checkbox"
                                        className="featured-checkbox"
                                        checked={bookDetails.featured}
                                        onChange={() => setBookDetails({ ...bookDetails, featured: !bookDetails.featured })}
                                    />
                                </p>
                            </div>
                            <div className="submit-form">
                                <button className="btn3" type="submit">Finish Creating Product</button>
                            </div>
                        </div>
                    </form>
                </section>
            </AmplifyAuthenticator>
        </section>
    );
    }

    else if (userName != "Admin") {

        return (
            <section className="admin-wrapper">
            <body id="customBlock"></body>

            <AmplifyAuthenticator AmplifySignInButton onClick={() => f1()}> 
            <h1 className="book-dtails">Welcome {userName}</h1>
            <h3 className="book-dtails">Email: {email}</h3>
            <h3 className="book-dtails">Phone #: {phoneNumber}</h3>
            <body id="customBlock"></body>
                <header className="form-header">
                <AmplifySignOut></AmplifySignOut>
                </header>
            </AmplifyAuthenticator>
            
            <body id="customBlock"></body>
            <header className="main-head">
            <nav>
                <h1 className="logo">Admin Users</h1>
                <ul>
                    <body id="customMargin"></body>
                    <Link id="customMargin2" to="/account">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id="customColor" icon={faUser}/>
                        <Link id="headerColor" to="/admin"> If you are an Admin, Click Here</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>
                </ul>
            </nav>
            </header>
            <div className="orderHeader">Your Orders</div>



            <section className="comments-1">
              <div className="comment-flex">
              <section>
              <article className="orders-id-format-more-header" style={{ height: 30}}>
              <div className="orders-id-format-header">Product ID #
              </div>
              </article>
              </section>

              <section>
              <article className="orders-name-format-more-header" style={{ height: 30}}>
              <div className="orders-name-format-header">Product Title
              </div>
              </article>
              </section>

              <section>
              <article className="orders-quantity-format-more-header" style={{ height: 30}}>
              <div className="orders-quantity-format-header">Amount
              </div>
              </article>
              </section>

              <section>
              <article className="orders-total-format-more-header" style={{ height: 30}}>
              <div className="orders-total-format-header">Total Cost
              </div>
              </article>
              </section>

              </div>

              {userorders.sort((a, b) => a.createdAt < b.createdAt ? 1:-1).map(({ id, theBooksId, theBooksTitle, theBooksQuantity, total}) => (

              <div>
           
              <div className="orders-number-format-header" style={{ height: 20, width: 345}}>&nbsp; &nbsp; Order # - {id}
              </div>
             

              <div className="comment-flex">
              
              <section>
              <article key={id} className="orders-id-format-more" style={{ height: 11 * theBooksId.length}}>
              <div className="orders-id-format">
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[0] != null ? (theBooksId[0].length - 16) : 0, borderStyle: theBooksId[0] != null ? "Solid" : "None"}}>{theBooksId[0]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[1] != null ? (theBooksId[1].length - 16) : 0, borderStyle: theBooksId[1] != null ? "Solid" : "None"}}>{theBooksId[1]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[2] != null ? (theBooksId[2].length - 16) : 0, borderStyle: theBooksId[2] != null ? "Solid" : "None"}}>{theBooksId[2]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[3] != null ? (theBooksId[3].length - 16) : 0, borderStyle: theBooksId[3] != null ? "Solid" : "None"}}>{theBooksId[3]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[4] != null ? (theBooksId[4].length - 16) : 0, borderStyle: theBooksId[4] != null ? "Solid" : "None"}}>{theBooksId[4]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[5] != null ? (theBooksId[5].length - 16) : 0, borderStyle: theBooksId[5] != null ? "Solid" : "None"}}>{theBooksId[5]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[6] != null ? (theBooksId[6].length - 16) : 0, borderStyle: theBooksId[6] != null ? "Solid" : "None"}}>{theBooksId[6]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[7] != null ? (theBooksId[7].length - 16) : 0, borderStyle: theBooksId[7] != null ? "Solid" : "None"}}>{theBooksId[7]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[8] != null ? (theBooksId[8].length - 16) : 0, borderStyle: theBooksId[8] != null ? "Solid" : "None"}}>{theBooksId[8]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[9] != null ? (theBooksId[9].length - 16) : 0, borderStyle: theBooksId[9] != null ? "Solid" : "None"}}>{theBooksId[9]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[10] != null ? (theBooksId[10].length - 16) : 0, borderStyle: theBooksId[10] != null ? "Solid" : "None"}}>{theBooksId[10]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[11] != null ? (theBooksId[11].length - 16) : 0, borderStyle: theBooksId[11] != null ? "Solid" : "None"}}>{theBooksId[11]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[12] != null ? (theBooksId[12].length - 16) : 0, borderStyle: theBooksId[12] != null ? "Solid" : "None"}}>{theBooksId[12]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[13] != null ? (theBooksId[13].length - 16) : 0, borderStyle: theBooksId[13] != null ? "Solid" : "None"}}>{theBooksId[13]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[14] != null ? (theBooksId[14].length - 16) : 0, borderStyle: theBooksId[14] != null ? "Solid" : "None"}}>{theBooksId[14]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[15] != null ? (theBooksId[15].length - 16) : 0, borderStyle: theBooksId[15] != null ? "Solid" : "None"}}>{theBooksId[15]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[16] != null ? (theBooksId[16].length - 16) : 0, borderStyle: theBooksId[16] != null ? "Solid" : "None"}}>{theBooksId[16]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[17] != null ? (theBooksId[17].length - 16) : 0, borderStyle: theBooksId[17] != null ? "Solid" : "None"}}>{theBooksId[17]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[18] != null ? (theBooksId[18].length - 16) : 0, borderStyle: theBooksId[18] != null ? "Solid" : "None"}}>{theBooksId[18]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[19] != null ? (theBooksId[19].length - 16) : 0, borderStyle: theBooksId[19] != null ? "Solid" : "None"}}>{theBooksId[19]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksId[20] != null ? (theBooksId[20].length - 16) : 0, borderStyle: theBooksId[20] != null ? "Solid" : "None"}}>{theBooksId[20]}</div>
              </div>
              </article>
              </section>

              <section>
              <article key={id} className="orders-name-format-more" style={{ height: 11 * theBooksId.length}}>
              <div className="orders-name-format">
              <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[0] != null ? (theBooksId[0].length - 16) : 0, borderStyle: theBooksId[0] != null ? "Solid" : "None"}}>{theBooksTitle[0]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[1] != null ? (theBooksId[1].length - 16) : 0, borderStyle: theBooksId[1] != null ? "Solid" : "None"}}>{theBooksTitle[1]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[2] != null ? (theBooksId[2].length - 16) : 0, borderStyle: theBooksId[2] != null ? "Solid" : "None"}}>{theBooksTitle[2]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[3] != null ? (theBooksId[3].length - 16) : 0, borderStyle: theBooksId[3] != null ? "Solid" : "None"}}>{theBooksTitle[3]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[4] != null ? (theBooksId[4].length - 16) : 0, borderStyle: theBooksId[4] != null ? "Solid" : "None"}}>{theBooksTitle[4]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[5] != null ? (theBooksId[5].length - 16) : 0, borderStyle: theBooksId[5] != null ? "Solid" : "None"}}>{theBooksTitle[5]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[6] != null ? (theBooksId[6].length - 16) : 0, borderStyle: theBooksId[6] != null ? "Solid" : "None"}}>{theBooksTitle[6]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[7] != null ? (theBooksId[7].length - 16) : 0, borderStyle: theBooksId[7] != null ? "Solid" : "None"}}>{theBooksTitle[7]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[8] != null ? (theBooksId[8].length - 16) : 0, borderStyle: theBooksId[8] != null ? "Solid" : "None"}}>{theBooksTitle[8]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[9] != null ? (theBooksId[9].length - 16) : 0, borderStyle: theBooksId[9] != null ? "Solid" : "None"}}>{theBooksTitle[9]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[10] != null ? (theBooksId[10].length - 16) : 0, borderStyle: theBooksId[10] != null ? "Solid" : "None"}}>{theBooksTitle[10]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[11] != null ? (theBooksId[11].length - 16) : 0, borderStyle: theBooksId[11] != null ? "Solid" : "None"}}>{theBooksTitle[11]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[12] != null ? (theBooksId[12].length - 16) : 0, borderStyle: theBooksId[12] != null ? "Solid" : "None"}}>{theBooksTitle[12]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[13] != null ? (theBooksId[13].length - 16) : 0, borderStyle: theBooksId[13] != null ? "Solid" : "None"}}>{theBooksTitle[13]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[14] != null ? (theBooksId[14].length - 16) : 0, borderStyle: theBooksId[14] != null ? "Solid" : "None"}}>{theBooksTitle[14]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[15] != null ? (theBooksId[15].length - 16) : 0, borderStyle: theBooksId[15] != null ? "Solid" : "None"}}>{theBooksTitle[15]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[16] != null ? (theBooksId[16].length - 16) : 0, borderStyle: theBooksId[16] != null ? "Solid" : "None"}}>{theBooksTitle[16]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[17] != null ? (theBooksId[17].length - 16) : 0, borderStyle: theBooksId[17] != null ? "Solid" : "None"}}>{theBooksTitle[17]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[18] != null ? (theBooksId[18].length - 16) : 0, borderStyle: theBooksId[18] != null ? "Solid" : "None"}}>{theBooksTitle[18]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[19] != null ? (theBooksId[19].length - 16) : 0, borderStyle: theBooksId[19] != null ? "Solid" : "None"}}>{theBooksTitle[19]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[20] != null ? (theBooksId[20].length - 16) : 0, borderStyle: theBooksId[20] != null ? "Solid" : "None"}}>{theBooksTitle[20]}</div>
              </div>
              </article>
              </section>

              <section>
              <article key={id} className="orders-quantity-format-more" style={{ height: 11 * theBooksId.length}}>
              <div className="orders-quantity-format">
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[0] != null ? (theBooksId[0].length - 16) : 0, borderStyle: theBooksId[0] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[0]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[1] != null ? (theBooksId[1].length - 16) : 0, borderStyle: theBooksId[1] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[1]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[2] != null ? (theBooksId[2].length - 16) : 0, borderStyle: theBooksId[2] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[2]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[3] != null ? (theBooksId[3].length - 16) : 0, borderStyle: theBooksId[3] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[3]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[4] != null ? (theBooksId[4].length - 16) : 0, borderStyle: theBooksId[4] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[4]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[5] != null ? (theBooksId[5].length - 16) : 0, borderStyle: theBooksId[5] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[5]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[6] != null ? (theBooksId[6].length - 16) : 0, borderStyle: theBooksId[6] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[6]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[7] != null ? (theBooksId[7].length - 16) : 0, borderStyle: theBooksId[7] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[7]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[8] != null ? (theBooksId[8].length - 16) : 0, borderStyle: theBooksId[8] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[8]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[9] != null ? (theBooksId[9].length - 16) : 0, borderStyle: theBooksId[9] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[9]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[10] != null ? (theBooksId[10].length - 16) : 0, borderStyle: theBooksId[10] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[10]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[11] != null ? (theBooksId[11].length - 16) : 0, borderStyle: theBooksId[11] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[11]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[12] != null ? (theBooksId[12].length - 16) : 0, borderStyle: theBooksId[12] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[12]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[13] != null ? (theBooksId[13].length - 16) : 0, borderStyle: theBooksId[13] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[13]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[14] != null ? (theBooksId[14].length - 16) : 0, borderStyle: theBooksId[14] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[14]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[15] != null ? (theBooksId[15].length - 16) : 0, borderStyle: theBooksId[15] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[15]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[16] != null ? (theBooksId[16].length - 16) : 0, borderStyle: theBooksId[16] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[16]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[17] != null ? (theBooksId[17].length - 16) : 0, borderStyle: theBooksId[17] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[17]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[18] != null ? (theBooksId[18].length - 16) : 0, borderStyle: theBooksId[18] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[18]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[19] != null ? (theBooksId[19].length - 16) : 0, borderStyle: theBooksId[19] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[19]}</div>
                <div className="orders-id-format-1" style={{ background: "White", height: theBooksTitle[20] != null ? (theBooksId[20].length - 16) : 0, borderStyle: theBooksId[20] != null ? "Solid" : "None"}}>&nbsp; {theBooksQuantity[20]}</div>
              </div>
              </article>
              </section>

              <section>
              <article key={id} className="orders-total-format-more" style={{ height: Math.max(41, (20 * theBooksId.length) + 1)}}>
              <div className="orders-total-format-1" style={{marginTop: 7, height: theBooksTitle[20] != null ? (theBooksId[20].length - 16) : 0, borderStyle: theBooksId[20] != null ? "Solid" : "None"}}> &nbsp; &nbsp; &nbsp; &nbsp; ${total}</div>
              </article>
              </section>

              </div>
              
              </div>

              ))}
          </section>




            </section>

            
        )
    }

    function f1() {
        var className = "";
        var confirmName = "";
        document.addEventListener('click', function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement,
                text = target.textContent || target.innerText;   
                var maybeButton = e.path[0].type;
                var isButton = false;
                if (maybeButton == "submit") {
                    //console.log("IS BUTTON");
                    isButton = true;
                }
                if (isButton == true) {
                    className = e.path[5].className;
                    //setTimeout(myFunction(), 3000);
                    try {
                    confirmName = e.path[14].attributes[0 ].ownerElement.localName;
                    } catch (e) {
                    confirmName = "";
                    }
                    if (className == "sign-in-form-footer" || confirmName == "amplify-confirm-sign-up") {
                        console.log("Clicked sign in or confirm button");
                        setTimeout(function() { myFunction(); },2000);
                    } 
                }
        }, false);
    }

    function myFunction() {
        window.location.reload();
      }
    
}

ReactDOM.render(Account, document.getElementById('root'));
export default RInfo
