function createCookie(setNum, patientAnswers, numErrors) {
    document.cookie = "set" + setNum + "=" + patientAnswers + numErrors.toString() + ";";
}
