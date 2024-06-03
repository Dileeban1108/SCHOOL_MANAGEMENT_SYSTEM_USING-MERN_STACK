import React from "react";
import "../styles/services.css";
import image1 from "../assets/primary.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const imagesData = [
  { id: 1, image: image1, description: "Description for Service 1" },
  { id: 2, image: image1, description: "Description for Service 2" },
  { id: 3, image: image1, description: "Description for Service 3" },
  // Add more images as needed
];

const ServicesPage = ({ userRole }) => {
  const [announcements,setAnnouncements]=useState()
  const handleDelete = async (index) => {
    let response = await axios.delete(
      `http://localhost:3001/auth/deleteAnnouncement/${index}`
    );
  };
  const handleClick = async () => {
    let response = await axios.get(
      `http://localhost:3001/auth/getAnnouncements`
    );
    if(response){
      setAnnouncements(respone.data)
    }
  };
  return (
    <section className="services">
      <div className="services-container">
        <div className="slider">
          {imagesData.map((img, index) => (
            <div key={index} className="slide">
              <div
                className="bac-img"
                style={{ backgroundImage: `url(${img.image})` }}
              >
                <div className="description">{img.description}</div>
                {/* {userRole === "user" && ( */}
                <div
                  className="delete_icon"
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
                {/* )} */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
