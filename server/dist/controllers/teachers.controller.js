"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateTeacher = exports.getTeachersByCompany = exports.updateTeacher = exports.createTeacher = exports.getTeacher = exports.getTeachers = void 0;
const mysql_config_1 = __importDefault(require("../config/mysql.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const code_enum_1 = require("../enum/code.enum");
const status_enum_1 = require("../enum/status.enum");
const response_1 = require("../domain/response");
const teachers_query_1 = require("../query/teachers.query");
const dotenv_1 = __importDefault(require("dotenv"));
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.SELECT_TEACHERS);
        return res.status(code_enum_1.Code.OK)
            .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Teachers fetched successfully', result[0]));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getTeachers = getTeachers;
const getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.SELECT_TEACHER, [req.params.teacher_id]);
        if (result[0].length > 0) {
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Teacher fetched successfully', result[0]));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Teacher not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));
    }
});
exports.getTeacher = getTeacher;
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let teacher = Object.assign({}, req.body);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.CREATE_TEACHER, Object.values(teacher));
        teacher = Object.assign({ teacher_id: result[0].insertId }, req.body);
        return res.status(code_enum_1.Code.CREATED)
            .send(new response_1.HttpResponse(code_enum_1.Code.CREATED, status_enum_1.Status.CREATED, 'Teacher created successfully', teacher));
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while creating teacher'));
    }
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let teacher = Object.assign({}, req.body);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.SELECT_TEACHERS, [req.params.teacher_id]);
        if (result[0].length > 0) {
            const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.UPDATE_TEACHER, [...Object.values(teacher), req.params.teacher_id]);
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Teacher updated', Object.assign(Object.assign({}, teacher), { id: req.params.teacher_id })));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Teacher not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while updating teacher'));
    }
});
exports.updateTeacher = updateTeacher;
const getTeachersByCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.info(`[${new Date().toLocaleDateString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`);
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const result = yield mysql_config_1.default.query(teachers_query_1.QUERY.SELECT_TEACHERS_BY_COMPANY, [req.params.company_name]);
        if (result[0].length > 0) {
            return res.status(code_enum_1.Code.OK)
                .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Teachers by company fetched successfully', result[0]));
        }
        else {
            return res.status(code_enum_1.Code.NOT_FOUND)
                .send(new response_1.HttpResponse(code_enum_1.Code.NOT_FOUND, status_enum_1.Status.NOT_FOUND, 'Teachers by company not found'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while fetching teachers'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.getTeachersByCompany = getTeachersByCompany;
const authenticateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    dotenv_1.default.config();
    const { email, password } = req.body;
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        const [rows] = yield mysql_config_1.default.query(teachers_query_1.QUERY.SELECT_TEACHER_BY_EMAIL, [email]);
        if (rows.length > 0) {
            const teacher = rows[0];
            // Directly comparing the plaintext passwords
            if (password === teacher.password) {
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({
                    teacher_id: teacher.teacher_id,
                    email: teacher.email,
                    role: 'teacher'
                }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : 'default-secret', { expiresIn: '1h' });
                console.log(`TeacterId: ${teacher.teacher_id} authenticated successfully.`);
                return res.status(code_enum_1.Code.OK)
                    .send(new response_1.HttpResponse(code_enum_1.Code.OK, status_enum_1.Status.OK, 'Teacher authenticated', { token, teacherId: teacher.teacher_id }));
            }
            else {
                return res.status(code_enum_1.Code.UNAUTHORIZED)
                    .send(new response_1.HttpResponse(code_enum_1.Code.UNAUTHORIZED, status_enum_1.Status.UNAUTHORIZED, 'Invalid password'));
            }
        }
        else {
            return res.status(code_enum_1.Code.UNAUTHORIZED)
                .send(new response_1.HttpResponse(code_enum_1.Code.UNAUTHORIZED, status_enum_1.Status.UNAUTHORIZED, 'Invalid user email'));
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        return res.status(code_enum_1.Code.INTERNAL_SERVER_ERROR)
            .send(new response_1.HttpResponse(code_enum_1.Code.INTERNAL_SERVER_ERROR, status_enum_1.Status.INTERNAL_SERVER_ERROR, 'An error occurred while authenticating teacher'));
    }
    finally {
        if (connection)
            connection.release();
    }
});
exports.authenticateTeacher = authenticateTeacher;
//  using bcrypt to compare the hashed password
// export const authenticateTeacher = async (req: Request, res: Response): Promise<Response<HttpResponse>> => {
//     dotenv.config();
//     const { email, password } = req.body;
//     let connection: any;
//     try {
//         connection = await pool.getConnection();
//         const [rows]: [RowDataPacket[], any] = await pool.query(QUERY.SELECT_TEACHER_BY_EMAIL, [email] );
//         if (rows.length > 0) {
//             const teacher = rows[0];
//             const passwordMatch = await bcrypt.compare(password, teacher.password);
//             if (passwordMatch) {
//                 // Generate JWT token
//                 const token = jwt.sign(
//                     { teacher_id: teacher.teacher_id, email: teacher.email },
//                     process.env.JWT_SECRET ?? 'default-secret', // Make sure to have a JWT_SECRET in your .env
//                     { expiresIn: '1h' } // Token expires in 1 hour
//                 );
//                 return res.status(Code.OK)
//                     .send(new HttpResponse(Code.OK, Status.OK, 'Teacher authenticated', { token }));
//             } else {
//                 return res.status(Code.UNAUTHORIZED)
//                     .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid credentials'));
//             }
//         } else {
//             return res.status(Code.UNAUTHORIZED)
//                 .send(new HttpResponse(Code.UNAUTHORIZED, Status.UNAUTHORIZED, 'Invalid credentials'));
//         }
//     } catch (error: unknown) {
//         console.error(`[${new Date().toLocaleDateString()}] ${error}`);
//         return res.status(Code.INTERNAL_SERVER_ERROR)
//             .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, 'An error occurred while authenticating teacher'));
//     } finally {
//         if (connection) connection.release();
//     }
// };
