import { getTeachersByCompany } from "../../contexts/apiRequests/teachersApiRequests";
import { Resource } from "../../interface/resource";
import { getStudyYear } from "../GetStudyYear";


export const selectTeacher = async (companyName: string, startDate: Date, resources: Resource[]): Promise<Resource> => {
    // use startDate to get the study year
    const studyYear = getStudyYear(startDate);
    const token = localStorage.getItem('token');

    let authHeader: any = {};
    if (token) {
        authHeader = {headers: { Authorization: `Bearer ${token}` }};
    }
   
    // get all the teacher resources for the study year and if used_resources < total_resources (resources available)
    const resourcesForYear = resources.filter((resource: Resource) => resource.study_year === studyYear && resource.used_resources < resource.total_resources)
    //sort resourcesForYear ascending by used_resources
    resourcesForYear.sort((a: any, b: any) => a.used_resources - b.used_resources)

    if (resourcesForYear.length === 0) {
        console.log('No resources available for the year:', studyYear)
        return null;
    }
    
    // get all the teachers who have set the company as their favorite company
    const response = await getTeachersByCompany(companyName, authHeader)

    if (response.statusCode === 200) {
        const teachersWithFavoComp = response.data
        
        // The following gets the teacher with the least used_resources using the resourcesForYear:
        // resourcesForYear is already sorted by used_resources, the first element has the smallest number in used_resources
        // if .some() finds a match between the teacher_id in resourcesForYear and teachersWithFavoComp,
        //   it returns true and the teacher is saved in favCompanyResources
        const favCompanyResources = resourcesForYear.filter((resource: Resource) => 
        teachersWithFavoComp.some((teacher: any) => teacher.teacher_id === resource.teacher_id));

        if (favCompanyResources.length > 0) {
            // if there are teachers with favorite company, get the teacher with the least used_resources
            return favCompanyResources[0];
        } else {
            // if no teachers with favorite company, get the teacher with the least used_resources of all teachers
            // who have resources for the study year
            return resourcesForYear[0];
        } 
    } else {
        // if no teachers with favorite company, get the teacher with the least used_resources
        return resourcesForYear[0];
    }
};