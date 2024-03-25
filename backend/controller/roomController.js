//roomController

const Room = require('../models/roomModel');

// Controller for handling room-related operations

// Function to create a new room
const createRoom = async (req, res) => {
    const { title, detail, price } = req.body;
    try {
        const room = await Room.registerRoom(title, detail, price);
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Function to get all available rooms
const getAvailableRooms = async (req, res) => {
    try {
        const rooms = await Room.findAvailableRooms();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const { title, available, detail, price } = req.body;
    try {
        const room = await Room.findByIdAndUpdate(roomId, { title, available, detail, price }, { new: true });
        if (!room) {
            return res.status(404).json({ error: "Room not found" });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createRoom,
    getAvailableRooms,
    updateRoom,
    getAllRooms
};