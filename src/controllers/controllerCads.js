const Login = require('../models/login')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {authSecret} = require('../../.env')
const { use } = require('../routes')

module.exports={
   async Register(req,res){
        const {Name,Email,password} = req.body;

        const Password = await bcrypt.hash(password, 10)
        console.log(Password)
    try {
        if (await Login.findOne({
            where:{
                Email:Email
            }
         })) {
            return res.status(400).json({ error: "User already exists" });
        }
            const logins = await Login.create({ Name,Email,Password})
            return res.json(logins)
        }catch(err){
            return res.status(400).json({ error: "User registration failed" });
        }
    },

    async Login(req,res){
        const {Email,password}=req.body;
        try{
           
            const user = await Login.findOne({
                where:{
                    Email:Email
                }
            })
           
            if(!user){
                return res.status(400).json({ error: "User not found" });
            }else{
            bcrypt.compare(password,user.Password,(err, result)=>{
                console.log(result,err)
                if(err||!result){
                    console.log(user.Password)
                    return res.status(401).send("A senha informada é inválida!")
                }
                const playload = { id:user.id }
                res.json({
                    id:user.id,
                    Name:user.Name,
                    Email:user.Email,
                    token:jwt.sign(playload,authSecret),
                    })
                })
                    
            }
        }catch{
            return res.status(400).json({ error: "Problema com o login" });
        }

    },
    async find (req,res){
        const find = await Login.findOne({
            where:{
                id:req.params.id
            }
        })
     
        return res.json(find)
    },

    async index(req,res){
        const cads = await Login.findAll()

        return res.json(cads)
    },
}