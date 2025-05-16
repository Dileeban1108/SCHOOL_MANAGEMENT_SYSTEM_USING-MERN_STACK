import React, { useState, useEffect } from "react";
import "../styles/event.css";
import NavBarOptional from "../components/NavBarOptional";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [subImageIndex, setSubImageIndex] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getEvents");
        if (response.data) {
          const formattedEvents = response.data.map((event) => ({
            ...event,
            image: event.image.replace(/\\/g, "/"),
          }));
          setEvents(formattedEvents);
          if (formattedEvents.length > 1) {
            setSubImageIndex(1);
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
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [events.length]);

  const handleDelete = async (index) => {
    try {
      const event = events[index];
      await axios.delete("http://localhost:3001/auth/deleteEvent", {
        data: { id: event._id },
      });
      setEvents(events.filter((_, i) => i !== index));
      setMenuOpenIndex(null);
    } catch (error) {
      console.error("There was an error deleting the event!", error);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userinfo = JSON.parse(localStorage.getItem("userinfo"));
        if (userinfo && userinfo.email) {
          const email = userinfo.email;
          let response = await axios.get(`http://localhost:3001/auth/getUser/${email}`);
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
              {userRole === "user" && userDetails.position === "media team" && (
                <div className="menu_container">
                  <div
                    className="menu_icon"
                    onClick={() =>
                      setMenuOpenIndex(menuOpenIndex === subImageIndex ? null : subImageIndex)
                    }
                  >
                    &#8942;
                  </div>
                  {menuOpenIndex === subImageIndex && (
                    <div className="menu_dropdown">
                      <div onClick={() => handleDelete(subImageIndex)}>Delete</div>
                    </div>
                  )}
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
