// import {Request, Response} from 'express';
// import { Student} from '../interface/student';
// import {Teacher} from '../interface/teacher';
// import {findStudentByEmail} from './students.controller';
// import {findTeacherByEmail} from './teachers.controller';

// export const authenticateUser = async (req: Request, res: Response) => {
//     const {email, password} = req.body;
//     let student: Student | null = await findStudentByEmail(email);
//     let teacher: Teacher | null = await findTeacherByEmail(email);
//     if (student) {
//         if (student.password === password) {
//             return res.status(200).send({message: 'Student authenticated'});
//         } else {
//             return res.status(401).send({message: 'Invalid credentials'});
//         }
//     } else if (teacher) {
//         if (teacher.password === password) {
//             return res.status(200).send({message: 'Teacher authenticated'});
//         } else {
//             return res.status(401).send({message: 'Invalid credentials'});
//         }
//     } else {
//         return res.status(401).send({message: 'Invalid credentials'});
//     }
// };