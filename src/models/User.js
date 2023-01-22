const mongoose=require('mongoose');

const UserSchema = mongoose.Schema({

nom : {type:String, required:"true"},
prenom : {type:String, required:"true"},
role : {type:String, required:"true"},
}, { timestamps: true },

)
const User = mongoose.model('User', UserSchema);
module.exports = User;