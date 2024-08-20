import { sendEmailNotification } from '../contexts/apiRequests/userApiRequests';
import { Student } from '../interface/student';


export const sendEmail = async (recipientEmail: string, student: string, projectName: string, company: string, date: string) => {
    const subject = 'A new Company Oriented Project supervision.';
    const body =
        `You have been assigned as a supervisor to a new Company Oriented Project with the following details:\n
        Student Name: ${student}
        Project Name: ${projectName}
        Company: ${company}
        Start Date: ${date}\n
        Please login to the projects management system to view the project details.`;
    try {
        const response = await sendEmailNotification(recipientEmail, subject, body);
        if (response.status === 200) {
            return true;
        } else {
            console.error('Failed to send email');
            return false;
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
};

export const noResourcesEmailToTeachers = async (teacherEmails: string[], name: string, classCode: string, startDate: string) => {
    const subject = 'No teacher resources for Company Oriented Projects.';
    const body =
        `This mail was sent automatically to all teachers who are assigned as supervisors in Company Oriented Projects Management tool.
        
        Student ${name}
        class ${classCode.toUpperCase()} 
        has created a new project starting at ${startDate}, 
        
        but there are no supervisor resources available for the projects.`;
    try {
        const emailResults = await Promise.allSettled(
            teacherEmails.map((email) => sendEmailNotification(email, subject, body))
        );
        const successes = emailResults.filter(result => result.status === 'fulfilled');
        const failures = emailResults.filter(result => result.status === 'rejected');

        if (failures.length > 0) {
            console.error(`Failed to send ${failures.length} of ${teacherEmails.length} emails.`);
        }

        if (successes.length > 0) {
            console.log(`Successfully sent ${successes.length} emails.`);
            return true;
        } else {
            console.error('All email attempts failed.');
            return false;
        }
    } catch (error) {
        console.error("Unexpected error while sending emails:", error);
        return false;
    }
};
