const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    password: 
    { 
        type: String,
        required: true 
    },
    Role: {
        type: String,
        enum: [ 'Admin', 'User', 'Baker' ],
        default: 'User'
    },
    token: String
})

UserSchema.pre('save', async function (next) {
    var user = this
    if(!user.isModified('password'))
        next()
    var salt = await bcrypt.genSalt(10)
    var hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    next()
})

UserSchema.statics.findUser = async function ({email, password}) {
    try{
        var user = await User.findOne({email})
        var match = await bcrypt.compare(password, user.password)
        if(match)
            return user
        return null
    }catch(err) {
        throw err
    }
}

var User = mongoose.model('User', UserSchema)

module.exports = User