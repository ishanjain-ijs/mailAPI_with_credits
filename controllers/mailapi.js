// const db = require('../models/index')
const requestIp = require('request-ip');
const MailAPI = require('../models/mailapi')
const nodemailer = require('nodemailer')
const createMail = async(req, res, next) => {
    try{
        const {id,  credits,   apiKey} = req.body;
        const validIP = requestIp.getClientIp(req)
        const data = {id, credits, validIP,  apiKey}
        const create = await MailAPI.create(data)
        const apiID = create.id
        const APIKEY = create.apiKey
        res.status(201).json({ status: "created", apiID, APIKEY});
    }
    catch(error){
        res.status(404).json({error: error.message})
        next(error)
    }
}



module.exports = {createMail};