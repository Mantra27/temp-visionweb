//this component is gonna be under Kaushikee
const authParams = { senderMail : "no-reply@dicot.tech", senderPass : "Dicot@2401" }
const nodemailer = require('nodemailer');
try{
    //-----> mainMan ( target_email_id, {subject: "new", body:"email body"} );
    const mailMan = async (track:any, content:any, options:any = authParams) =>{
        
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                host: "smtppro.zoho.in",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: authParams.senderMail, 
                  pass: authParams.senderPass
                },
              });

            let mailOptions = {
                from: authParams.senderMail,
                to: track,
                subject: content.subject,
                html: content.body
            };
            
            transporter.sendMail(mailOptions, (error:any, info:any) => {
                if (error) return reject(error);
                return resolve({status: 200, message: "email has been sent successfully!"});
            });
        })
    }
   
    module.exports = {mailMan};

}
catch(ERROR){
    console.log("FATAL error in /utils/handler.ts", ERROR)
}
export {}
