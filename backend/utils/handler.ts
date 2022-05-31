const authParams = { senderMail : "mantragohil1@gmail.com", senderPass : "9898517325" }
const nodemailer = require('nodemailer');
try{
    
    const mailMan = async (track:any, content:any, options:any = authParams) =>{
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: options.senderMail,
                    pass: options.senderPass,
                }
            });
            
            let mailOptions = {
        
                from: authParams.senderMail,
                to: track,
                subject: content.subject,
                html: content.body
        
            };
            transporter.sendMail(mailOptions, (error:any, info:any) => {
                if (error) return reject(error);
                return resolve({status: 200, message: "otp has been sent successfully!"});
            });
        })
    }
   
    module.exports = {mailMan};

}
catch(ERROR){
    console.log("FATAL error in /utils/handler.ts", ERROR)
}
export {}
