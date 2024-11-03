const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    username:{type:String,required: true, unique:true},
    email: {type: String, required:true, unique: true},
    senha: {type: String, required: true},
});

UsuarioSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.senha);
};

module.exports = mongoose.model('Usuario',UsuarioSchema);