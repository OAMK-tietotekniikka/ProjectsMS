import { useState } from "react";
import { useTeachersContext } from "../contexts/teachersContext";
export const selectTeacher = (company, startDate) => {
    const { teachers, resources } = useTeachersContext();
    const [selectedTeacher, setSelectedTeacher] = useState(null);
};
