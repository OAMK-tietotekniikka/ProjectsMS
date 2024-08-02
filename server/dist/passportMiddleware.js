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
exports.authorizeRoles = exports.authenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const mysql_config_1 = __importDefault(require("./config/mysql.config"));
dotenv_1.default.config();
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'default-secret',
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    let connection;
    try {
        connection = yield mysql_config_1.default.getConnection();
        let user;
        if (payload.role === 'student') {
            const [rows] = yield connection.query('SELECT * FROM students WHERE student_id = ?', [payload.student_id]);
            if (rows.length > 0) {
                user = rows[0];
                user.role = 'student';
            }
        }
        else if (payload.role === 'teacher') {
            const [rows] = yield connection.query('SELECT * FROM teachers WHERE teacher_id = ?', [payload.teacher_id]);
            if (rows.length > 0) {
                user = rows[0];
                user.role = 'teacher';
            }
        }
        connection.release();
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        done(error, false);
    }
})));
exports.authenticated = passport_1.default.authenticate('jwt', { session: false });
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
exports.default = passport_1.default;
