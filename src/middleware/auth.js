const helpers = {}


helpers.isAuthenticated = (req, res, next) =>{


    if (req.session.passport?.user == `62fee7b3e9055121232975f9` ) {
        

        return next()
    }else{

        
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