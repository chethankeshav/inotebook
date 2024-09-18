const express = require('express');
const router = express.Router();
const fetchuser = require("../middleware/fetchuser")
const { body, validationResult } = require('express-validator');
const Notes = require('../models/Notes');

//Route 1: Get all the notes using GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 2: Add a new note using POST "/api/auth/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id,
        });
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Update note using POST "/api/auth/updatenote/:id". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        const newNote = {};
        if(title) { newNote.title = title};
        if(description) { newNote.description = description};
        if(tag) { newNote.tag = tag};

        let note = await Notes.findById(req.params.id);
        
        if(!note) { res.status(404).send("Not Found") }
        if( note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 4: Delete note using DELETE "/api/auth/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note) { res.status(404).send("Not Found") }
        if( note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        //Allow deletion only if user owns this Note.
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been Deleted", note: note});
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router