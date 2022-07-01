const helpers = {}


helpers.isAuthenticated = (req, res, next) =>{
    console.log(`is autenticated middleware`);
    console.log(req.session);
    if (req.session.passport?.user == `62ba218582371d73524a94ca` ) {
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