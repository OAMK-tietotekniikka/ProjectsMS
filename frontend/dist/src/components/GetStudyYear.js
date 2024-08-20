export const getStudyYear = (date) => {
    if (!date) {
        return '';
    }
    const year = date.getFullYear();
    const studyYear = date.getMonth() < 7 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
    return studyYear;
};
