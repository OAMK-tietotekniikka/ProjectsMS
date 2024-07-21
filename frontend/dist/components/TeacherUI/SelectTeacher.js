var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getTeachersByCompany } from "../../contexts/apiRequests";
import { getStudyYear } from "../GetStudyYear";
import i18n from 'i18next';
export const selectTeacher = (companyName, startDate, resources) => __awaiter(void 0, void 0, void 0, function* () {
    // use startDate to get the study year
    const studyYear = getStudyYear(startDate);
    // get the resources for the study year
    const resourcesForYear = resources.filter((resource) => resource.study_year === studyYear && resource.used_resources < resource.total_resources);
    //sort resources ascending by used_resources
    resourcesForYear.sort((a, b) => a.used_resources - b.used_resources);
    if (resourcesForYear.length === 0) {
        console.log('No resources available for the year:', studyYear);
        alert(i18n.t('noResources', { studyYear }));
        return null;
    }
    const response = yield getTeachersByCompany(companyName);
    if (response.statusCode === 200) {
        const teachersWithFavoComp = response.data;
        // get the teacher with the least used_resources using the resourcesForYear
        const favCompanyResources = resourcesForYear.filter((resource) => teachersWithFavoComp.some((teacher) => teacher.teacher_id === resource.teacher_id));
        if (favCompanyResources.length > 0) {
            return favCompanyResources[0];
        }
        else {
            return resourcesForYear[0];
        }
    }
    else {
        // if no teachers with favorite company, get the teacher with the least used_resources
        return resourcesForYear[0];
    }
});
