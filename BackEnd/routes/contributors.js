const express = require("express");
const fs = require('fs/promises')

const path = require("path");

const contributorsFilePath = path.join(__dirname,"../data/contributors.json")
const eventsFilePath = path.join(__dirname,"../data/events.json")
// 1. Handle /events/:event_id/contributors
// router.get("/:event_id/contributors", (req, res) => {
//   const eventId = parseInt(req.params.event_id);

//   fs.readFile(contributorsFilePath, "utf-8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Unable to read contributors data" });

//     const contributors = JSON.parse(data);
//     const filtered = contributors.filter(c => c.event_id === eventId);
//     res.json(filtered);
//   });
// });

// // 2. Handle /events/contributors?username=bob456
// router.get("/contributors", (req, res) => {
//   const username = req.query.username;

//   if (!username) {
//     return res.status(400).json({ error: "Missing username query parameter" });
//   }

//   fs.readFile(contributorsFilePath, "utf-8", (err, data) => {
//     if (err) return res.status(500).json({ error: "Unable to read contributors data" });

//     const contributors = JSON.parse(data);
//     const filtered = contributors.filter(c => c.username === username);
//     res.json(filtered);
//   });
  // 3. get events for user

  // router.get("/getEventsForUser", (req, res) => {
  //   console.log(req)
  
  //   fs.readFile(contributorsFilePath, "utf-8", (err, data) => {
  //     if (err) return res.status(500).json({ error: "Unable to read contributors data" });
  
  //     const contributors = JSON.parse(data);
  //     const filtered = contributors.filter(c => c.event_id === eventId);
  //     res.json(filtered);
  //   });
  // });
  // });
  
  // GET all the events
   function getEventsForUser() {
    return async function (req, res) {
      try {
        const data = await fs.readFile(contributorsFilePath, 'utf-8')
        const eventsData = await fs.readFile(eventsFilePath, 'utf-8')
        const contributors = JSON.parse(data)
        const eventsParsed = JSON.parse(eventsData)
  
        const filtered = contributors.filter(c => c.username === req.query.username)
  
        // Assuming `permissions` is coming from `filtered` here:
        const permittedEventIds = filtered.map(p => p.event_id)
        const filteredEvents = eventsParsed.filter(event =>
          permittedEventIds.includes(event.event_id)
        )
        console.log(filteredEvents)
  
        res.json(filteredEvents)
      } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Unable to read contributors data' })
      }
    }
  }


module.exports = {getEventsForUser}
