const jwt = require('jsonwebtoken')

const isAuth = (req, res, next) => {

    try {
        if (!req.get('Authorization')) {
            return res.status(401).json({
                message: "Not Authenticated 11"
            })
        }
    
        const token = req.get('Authorization').split(' ')[0]
    
        if (!token) {
            return res.status(401).json({
                message:"Not Authenticated 22"
            })
        }
    
        let decodedToken = jwt.verify(token, "sawom-secret")
    
        if (!decodedToken) {
            return res.status(403).json({
                message: "Authentication failed"
            })
        }
    
        req.userId = decodedToken.userId
        next()
    }
    catch(err) {
        console.log(err)
        const error = errorCreator(err.message, 500)
        return next(error)
    } 
}

function errorCreator (message, statusCode) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

module.exports = isAuth