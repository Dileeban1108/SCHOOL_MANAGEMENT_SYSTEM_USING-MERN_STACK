const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.post("/login", authController.handleLogin);

router.post("/logDate", authController.handleLogDate);

router.post("/sendMessage", authController.handleSendMessage);

router.post("/createAnnouncement", authController.handleNewAnnouncement);
router.post("/createEvent", authController.handleNewEvent);
router.post("/createAchievement", authController.handleNewAchievement);
router.post("/createStudent", authController.handleNewStudent);
router.get("/getUser/:email", authController.getUserByEmail);
router.get("/getUser/:email", authController.getUserByEmail);

router.get("/getMessagesByRecieverEmail/:recieverEmail", authController.getMessagesByRecieverEmail);
router.get("/getMessagesBySenderEmail/:senderEmail", authController.getMessagesBySenderEmail);

router.get("/getTimeLogs", authController.getTimeLogs);
router.get("/getTimeLogsByEmail", authController.getTimeLogsByEmail);
router.put("/updateTimeLog", authController.updateTimeLog);


router.get("/getUsers/:position", authController.getUsersByPosition);
router.get("/getUsers/:grade", authController.getUserByGrade);
router.get("/getUsers", authController.getUsers);
router.get("/getStudents", authController.getStudents);
router.get("/getAnnouncements", authController.getAnnouncements);
router.get("/getAchievements", authController.getAchievements);
router.get("/getEvents", authController.getEvents);
router.delete("/deleteEvent", authController.deleteEvent);
router.delete("/deleteAchievement", authController.deleteAchievement);
router.delete("/deleteAnnouncement", authController.deleteAnnouncement);
router.delete("/deleteStudent/:id", authController.deleteStudent);

module.exports = router;
