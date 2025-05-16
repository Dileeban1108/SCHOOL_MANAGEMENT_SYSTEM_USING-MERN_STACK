import React, { useState, useEffect } from "react";
import "../styles/services.css";
import axios from "axios";

const ServicesPage = ({ userRole, userDetails }) => {
  const [achievements, setAchievements] = useState([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);

  useEffect(() => {
    const fetchAchievementss = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/getAchievements");
        if (response.data) {
          const formattedAchievements = response.data.map((achievement) => ({
            ...achievement,
            image: achievement.image.replace(/\\/g, "/"),
          }));
          setAchievements(formattedAchievements);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAchievementss();
  }, []);

  const handleDelete = async (index) => {
    try {
      const achievement = achievements[index];
      await axios.delete("http://localhost:3001/auth/deleteAchievement", {
        data: { id: achievement._id },
      });
      setAchievements(achievements.filter((_, i) => i !== index));
      setMenuOpenIndex(null); // close menu after delete
    } catch (error) {
      console.error("There was an error deleting the achivements!", error);
    }
  };
  return (
    <section className="services">
      <div className="services-container">
        <div className="slider">
          {achievements.map((achievement, index) => (
            <div key={achievement._id} className="slide">
              <div className="bac-img-container">
                <img
                  src={achievement.image}
                  alt="profile"
                  className="bac-img"
                />
                <div className="description">{achievement.description}</div>

                {userRole === "user" && userDetails.position === "media team" && (
                  <div className="menu_container">
                    <div
                      className="menu_icon"
                      onClick={() =>
                        setMenuOpenIndex(menuOpenIndex === index ? null : index)
                      }
                    >
                      &#8942;
                    </div>
                    {menuOpenIndex === index && (
                      <div className="menu_dropdown">
                        <div onClick={() => handleDelete(index)}>Delete</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
