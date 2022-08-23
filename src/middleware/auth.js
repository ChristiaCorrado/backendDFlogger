const helpers = {}


helpers.isAuthenticated = (req, res, next) =>{
    console.log(`is autenticated middleware`);
    console.log(req.session);
    if (req.session.passport?.user == `62fee7b3e9055121232975f9` ) {
        console.log('entp en true');
        return next()
    }else{
        console.log('entro en false');
        
        res.redirect(`/api/profile/${req.session.passport?.user}`)
    }

}

helpers.userAuth = (req, res, next) =>{
    if(req.session.passport?.user){

        return next()
    }else{
        res.redirect(`/login`)
    }
}

module.exports = helpers 