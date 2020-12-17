import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation, Storage } from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { createBookType } from '../api/mutations'
import config from '../aws-exports'

const {
    aws_user_files_s3_bucket_region: region,
    aws_user_files_s3_bucket: bucket
} = config


const Admin = () => {
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [bookDetails, setBookDetails] = useState({ title: "", description: "", image: "", video: "" , author: "", price: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        var overlay2 = document.getElementById('overlay2');
        overlay2.style.display = "inline";

        try {
            if (!bookDetails.title || !bookDetails.price) return
            await API.graphql(graphqlOperation(createBookType, { input: bookDetails }))
            console.log(bookDetails.image);
            console.log(bookDetails.video);
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

    return (
        <section className="admin-wrapper">
            <AmplifyAuthenticator>
                <section>
                    <h1 id="overlay2" className="overlay"> 
                        <div className="bgUV">Creating Product...</div>
                    </h1>
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
    )
}

export default Admin
