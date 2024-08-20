export interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
    email: string;
    class_code: string;
    password: string;
    created_at: Date;
}

export interface UpdatedStudent {
    first_name: string;
    last_name: string;
    email: string;
    class_code: string;
    password: string;
}