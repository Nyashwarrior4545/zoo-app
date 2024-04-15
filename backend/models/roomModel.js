//roomModel

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
});


// Static method to register a new room
roomSchema.statics.registerRoom = async function(title, detail, price) {
    if (!title || !detail || !price) {
        throw new Error('Please fill in all fields');
    }

    const room = new this({ title, detail, price });
    return room.save();
};

// Static method to find all available rooms
roomSchema.statics.findAvailableRooms = function() {
    return this.find({ available: true });
};

module.exports = mongoose.model('Room', roomSchema);
