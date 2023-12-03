import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ThumbnailList.css';
import { Link } from 'react-router-dom';
function ThumbnailList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    async function fetchVideos() {
      try {
        const response = await axios.get('http://localhost:5000/api/fetchData');
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    }

    fetchVideos();
  }, []);

  // Open video in new window
  const openVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="container">
     
      <Link to="/Upload">
        <button className="home-button">Home</button>
      </Link>
      <div className="table-container">
        <h2 className='heading'>Thumbnail List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video, index) => (
              <tr key={index} onClick={() => openVideo(video.videoUrl)}>
                <td>{video.Title}</td>
                <td>{video.Description}</td>
                <td>
                  <img className="image" src={video.imgUrl} alt={`Thumbnail ${index}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ThumbnailList;
