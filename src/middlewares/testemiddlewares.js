module.exports={
    Teste(req,res){
        return res.status(201).send({success:"successful authentication"});
    }
}