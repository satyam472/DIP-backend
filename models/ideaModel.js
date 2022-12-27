const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  description: {   
     type: String,    
     default: "New York", 
  },
  date: {
    type: Date,
    default: Date.now,
  },
 
});

const IdeaModel = mongoose.model("Idea", IdeaSchema);
module.exports = IdeaModel;