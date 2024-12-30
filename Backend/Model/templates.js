const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // trim: true
    },
    subject: {
        type: String,
      
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,

     
    },


  

    // version: {
    //     type: Number,
    //     default: 1
    // },
    category: {
        type: String,
        default: 'general'
    },
    createdBy: {
        // type: Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        default: 'admin'
    }
    
}, {
    timestamps: true
});

const Template = mongoose.model('Template', templateSchema);
module.exports = Template;