export interface Teacher {
    teacher_id: number;
    teacher_name: string;
    email: string;
    created_at: Date;
}

export interface newTeacher {
    teacher_name: string;
    email: string;
}