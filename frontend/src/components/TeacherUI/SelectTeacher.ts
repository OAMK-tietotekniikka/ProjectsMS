import { getTeachersByCompany } from "../../contexts/apiRequests/teachersApiRequests";
import { Resource } from "../../interface/resource";
import { getStudyYear } from "../GetStudyYear";
import i18n from 'i18next';

export const selectTeacher = async (companyName: string, startDate: Date, resources: Resource[]): Promise<Resource> => {
    // use startDate to get the study year
    const studyYear = getStudyYear(startDate);
   
    // get the resources for the study year
    const resourcesForYear = resources.filter((resource: Resource) => resource.study_year === studyYear && resource.used_resources < resource.total_resources)
    //sort resources ascending by used_resources
    resourcesForYear.sort((a: any, b: any) => a.used_resources - b.used_resources)

    if (resourcesForYear.length === 0) {
        console.log('No resources available for the year:', studyYear)
        alert(i18n.t('noResources', {studyYear}))
        return null;
    }
    
    const response = await getTeachersByCompany(companyName)

    if (response.statusCode === 200) {
        const teachersWithFavoComp = response.data
        
        // get the teacher with the least used_resources using the resourcesForYear
        const favCompanyResources = resourcesForYear.filter((resource: Resource) => 
        teachersWithFavoComp.some((teacher: any) => teacher.teacher_id === resource.teacher_id));

        if (favCompanyResources.length > 0) {
            return favCompanyResources[0];
        } else {
            return resourcesForYear[0];
        } 
    } else {
        // if no teachers with favorite company, get the teacher with the least used_resources
        return resourcesForYear[0];
    }
};