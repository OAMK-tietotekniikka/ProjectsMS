import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import dotenv from 'dotenv';
import pool from "./config/mysql.config";

dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'default-secret',
  };

passport.use(new JwtStrategy(opts, async (payload, done) => {
    let connection: any;
    try {
        connection = await pool.getConnection();
        let user;
        if (payload.role === 'student') {
          const [rows] = await connection.query('SELECT * FROM students WHERE student_id = ?', [payload.student_id]);
          if (rows.length > 0) {
            user = rows[0];
            user.role = 'student';
        }
        } else if (payload.role === 'teacher') {
          const [rows] = await connection.query('SELECT * FROM teachers WHERE teacher_id = ?', [payload.teacher_id]);
          if (rows.length > 0) {
            user = rows[0];
            user.role = 'teacher';
          }
        }
        connection.release();
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        } 
    } catch (error: unknown) {
        console.error(`[${new Date().toLocaleDateString()}] ${error}`);
        done(error, false);
    }
}));

export const authenticated = passport.authenticate('jwt', { session: false });

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

export default passport;