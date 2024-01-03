const mongoose = require('mongoose')

const specializationSchema = mongoose.Schema(
    {
        name: {
          type: String,
          required: "Name is required",
          trim: true,
          index: true
        }
      },
      { timestamps: true }
    );
    


module.exports = mongoose.model('Specialization', specializationSchema);