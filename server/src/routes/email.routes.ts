import { Router, Request, Response } from "express";  
import { sendEmail } from '../emailService';


const emailRouter = Router();

emailRouter.route('/')
    .post(async (req: Request, res: Response) => {
        const { to, subject, text } = req.body;
        try {
            await sendEmail(to, subject, text);
            res.status(200).send('Email sent successfully');
        } catch (error) {
            res.status(500).send('Error sending email');
        }
    });
    
export default emailRouter;

