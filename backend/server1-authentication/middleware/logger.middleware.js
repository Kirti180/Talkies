
const logger = (req, res, next) => {
    console.log(`Method: ${req.method}  | Route: ${req.url}`)
    next()
  
}
module.exports = {
    logger
}