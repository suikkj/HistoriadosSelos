const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Criação de conta e salvamento em banco de dados
exports.registrarUsuario = async(req, res) => {
    console.log('Rota de registro chamada');
    try{
    const{username, email, senha} = req.body;
    console.log('Dados recebidos:',{username,email,senha});
    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({username, email, senha: senhaHash});
    console.log('Tentando salvar novo usuário:', novoUsuario);
    await novoUsuario.save();
    const tokenAcesso = gerarToken(novoUsuario._id, '15m');
    const tokenAtualizacao = gerarToken(novoUsuario._id,'7d');
    console.log('Usuário salvo com sucesso');
    res.status(201).json({mensagem: 'Usuário registrado com sucesso!',
    tokenAcesso,
    tokenAtualizacao,
    });
} catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({erro: 'Erro ao registrar usuário.'});
}
};

//Login da conta
exports.loginUsuario = async(req,res) =>{
   const{email,senha} = req.body;
   console.log("Função de login foi chamada");
   console.log("Tentando fazer login com:", {email,senha});
   console.log('Conteúdo do req.body:', req.body);
   try{
    const usuario = await Usuario.findOne({email});
    if(!usuario){
        console.log('Usuário não encontrado');
        return res.status(401).json({erro: 'Usuário não encontrado.'});
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if(!senhaValida){
        console.log('Senha incorreta');
        return res.status(401).json({erro: 'Credenciais Inválidas'});
    }
    const token = jwt.sign({id: usuario._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie('tokenAcesso', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 7*24*60*60*1000
    });
    console.log('Login realizado com sucesso');
    res.status(200).json({mensagem:'Login realizado com sucesso!!!!!'});
   } catch(error){
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({erro: 'Erro ao processar a solicitação'});
   }
};





//Token JWT (user_id)
function gerarToken(id,expiresIn){
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn});
}

//Cookie