import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import "./Upload.css";
const Upload = () => {

  const [img, setImg] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const transformation = "w_50,h_50,c_scale";
  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === 'image' ? img : video);
    data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');
   
    try {
      let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      console.log(cloudName);
      let resourceType = type === 'image' ? 'image' : 'video';
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      console.log(api);
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      
      const imgUrl = await uploadFile('image');

      const videoUrl = await uploadFile('video');

      console.log(process.env);
      await axios.post('http://localhost:5000/api/videos', {
        Title: title,
        Description: description, imgUrl, videoUrl
      });

      setImg(null);
      setVideo(null);

      console.log("File upload success!");
      setLoading(false);
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }
  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className='upload-form'>
    
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlForor="title">Title:</label>
          <input
            type="text"
            id="title"
            class="form-control"
            placeholder="Enter Title (50 characters)"
            onChange={handleTitle}
            value={title}
          />
        </div>
        <br />

        <div className="form-group">
          <label className="label" htmlFor="description">Description:</label>
          <textarea
            id="description"
            class="form-control"
            placeholder="Enter Description (200 characters)"
            onChange={handleDesc}
            value={description}
          ></textarea>
        </div>
        <br />
        <div className='form-group'>
          <label className="label" htmlFor="img">Image:</label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>

        <br />
        <div className='form-group'>
          <label className="label" htmlFor="video">Video:</label>
          <br />
          <input
            type="file"
            accept="video/*"
            id="video"
            onChange={(e) => setVideo((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <div className="button-container">
       
        <button type="submit" className='btn btn-primary'>Upload</button>
        <Link to="/ThumbnailList">
        <div className="button_thumbnail_list">
          <button>ThumbnailList</button>
        </div>
      </Link>
      </div>
      </form>

      {
        loading && <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      }
      
    </div>


  )
}

export default Upload