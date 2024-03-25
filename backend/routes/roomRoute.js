//roomRoute

const express = require('express');

const { getAvailableRooms,
    createRoom,
    updateRoom,
    getAllRooms
        
        } =require('../controller/roomController')

// const requireAuth = require( '../middleware/requireAuth')

// require auth for all ticket routes
const router = express.Router()

router.get('/getallavaroom',getAvailableRooms);
router.post('/create',createRoom);
router.get('/getallroom',getAllRooms);
router.put('/:roomId',updateRoom);


module.exports = router;
