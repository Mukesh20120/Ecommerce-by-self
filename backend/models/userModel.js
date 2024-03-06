const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true},
    isAdmin: {type: Boolean,default: false},
},{
    timestamps: true
});

UserSchema.methods.matchPassword = async function(enteredPassword){
    const match = await bcrypt.compare(enteredPassword,this.password);
    return match;
}

UserSchema.pre('save',async function(){
   if(!this.isModified('password')){
    return;
   }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

module.exports = mongoose.model('User',UserSchema);