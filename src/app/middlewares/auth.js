const jwt = require ('jsonwebtoken');


module.exports = (req, res, next) =>{
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if(!authHeader)
      return res.status(401).send({error:'no Token Provided'}); 
    
    const parts = authHeader.split(' ');

    if(parts.lenght === 2)
      return res.status(401).send({error: 'Token error'});

    const [ scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme))
    return res.status(401).send({error: 'Token Malformatado'})

    jwt.verify(token, process.env.APP_SECRET_KEY,(err, decoded)=>{
      if(err) 
        return res.status(401).send({error: 'Token Invalid'});

      req.userId = decoded.id;
      return next();
    });

    
  }