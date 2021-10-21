const {User} = require('../models/user');

let auth = (req,res,next)=> {
    //인증 처리를 하는 곳

    //클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.X_auth;
    //토큰을 복호화하여 유저를 찾느다.
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth: false,error :true})

        req.token = token;
        req.user = user;
        next();
    })
    //유저가 있으면 인증 Okay

    //없으면 Np
}

module.exports= {auth};