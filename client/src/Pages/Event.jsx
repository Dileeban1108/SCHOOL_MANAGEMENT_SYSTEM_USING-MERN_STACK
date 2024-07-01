import React, { useState, useEffect } from "react";
import "../styles/event.css";
import NavBarOptional from "../components/NavBarOptional";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(1);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getEvents"
        );
        if (response.data) {
          const formattedEvents = response.data.map((event) => ({
            ...event,
            image: event.image.replace(/\\/g, "/"),
          }));
          console.log("Events:", formattedEvents);
          setEvents(formattedEvents);
          if (formattedEvents.length > 1) {
            setSubImageIndex(1); // Set initial subImageIndex to avoid being the same as mainImageIndex
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length > 1) {
      const interval = setInterval(() => {
        setMainImageIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % events.length;
          setSubImageIndex((newIndex + 1) % events.length);
          return newIndex;
        });
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [events.length]);

  const handleDelete = async (index) => {
    try {
      const event = events[index];
      await axios.delete("http://localhost:3001/auth/deleteEvent", {
        data: { id: event._id }, // Ensure correct key is used
      });
      setEvents(events.filter((_, i) => i !== index));
    } catch (error) {
      console.error("There was an error deleting the announcement!", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo && userinfo.email) {
          const email = userinfo.email;
          let response = await axios.get(
            `http://localhost:3001/auth/getUser/${email}`
          );
          if (response.data) {
            setUserRole("user");
            setUserDetails(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="event">
      <NavBarOptional />
      <div className="eve_main">
        <div className="eve_sub_1">
          {events.length > 0 && (
            <img
              src={events[mainImageIndex].image}
              alt="Event"
              className="eve_img_main"
            />
          )}
        </div>
        <div className="eve_sub_2">
          {events.length > 1 && (
            <div>
              {userRole === "user" &&
                (userDetails.position === "principal" ||
                  userDetails.position === "vice principal") && (
                  <div
                    className="delete_icon"
                    onClick={() => {
                      handleDelete(subImageIndex);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                )}
              <img
                src={events[subImageIndex].image}
                alt="Event"
                className="eve_img_sub"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
