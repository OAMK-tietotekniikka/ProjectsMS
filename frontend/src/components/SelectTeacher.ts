import { useState } from "react" 
import { useTeachersContext } from "../contexts/teachersContext"


export const selectTeacher = (company: String, startDate: Date) => {
    const { teachers, resources } = useTeachersContext() as any;
    const [ selectedTeacher, setSelectedTeacher ] = useState<any>(null)

}