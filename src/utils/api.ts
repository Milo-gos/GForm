const BE_URL = process.env.REACT_APP_BE_URL;

const API = {
    // Register
    RegisterUser: {
        endPoint: `${BE_URL}/auth/register`,
        method: 'post',
    },

    VerifyEmailPublicLink: {
        endPoint: `${BE_URL}/auth/verifyEmailPublicLink`,
        method: 'get',
    },

    VerifyEmail: {
        endPoint: `${BE_URL}/auth/verifyEmail`,
        method: 'get',
    },

    // Sign in
    SignIn: {
        endPoint: `${BE_URL}/auth/signIn`,
        method: 'post',
    },

    // Forgot - Reset password
    CheckExistEmail: {
        endPoint: `${BE_URL}/auth/checkExistEmail`,
        method: 'get',
    },

    VerifyLinkResetPassword: {
        endPoint: `${BE_URL}/auth/VerifyLinkResetPassword`,
        method: 'get',
    },

    ResetPassword: {
        endPoint: `${BE_URL}/auth/resetPassword`,
        method: 'post',
    },

    CreateSurvey: {
        endPoint: `${BE_URL}/survey/createSurvey`,
        method: 'post',
    },

    GetSurveyById: {
        endPoint: `${BE_URL}/survey/getSurveyById`,
        method: 'post',
    },

    ChangeQuestion: {
        endPoint: `${BE_URL}/question/changeQuestion`,
        method: 'patch',
    },
    ChangeOption: {
        endPoint: `${BE_URL}/option/changeOption`,
        method: 'patch',
    },

    AddOption: {
        endPoint: `${BE_URL}/option/addOption`,
        method: 'post',
    },
    AddRow: {
        endPoint: `${BE_URL}/row/addRow`,
        method: 'post',
    },
    AddGColumn: {
        endPoint: `${BE_URL}/gcolumn/addGColumn`,
        method: 'post',
    },
    AddQuestion: {
        endPoint: `${BE_URL}/question/addQuestion`,
        method: 'post',
    },
    DuplicateQuestion: {
        endPoint: `${BE_URL}/question/duplicateQuestion`,
        method: 'post',
    },
    AddFirstQuestion: {
        endPoint: `${BE_URL}/question/addFirstQuestion`,
        method: 'post',
    },
    DeleteQuestion: {
        endPoint: `${BE_URL}/question/deleteQuestion`,
        method: 'delete',
    },
    DeleteOption: {
        endPoint: `${BE_URL}/option/deleteOption`,
        method: 'delete',
    },
    DeleteRow: {
        endPoint: `${BE_URL}/row/deleteRow`,
        method: 'delete',
    },
    DeleteGColumn: {
        endPoint: `${BE_URL}/gcolumn/deleteGColumn`,
        method: 'delete',
    },
    ChangeLinearScale: {
        endPoint: `${BE_URL}/linearScale/changeLinearScale`,
        method: 'patch',
    },

    ChangeRow: {
        endPoint: `${BE_URL}/row/changeRow`,
        method: 'patch',
    },

    ChangeGColumn: {
        endPoint: `${BE_URL}/gcolumn/changeGColumn`,
        method: 'patch',
    },

    ChangeSurvey: {
        endPoint: `${BE_URL}/survey/changeSurvey`,
        method: 'patch',
    },

    CreateResponse: {
        endPoint: `${BE_URL}/response/createResponse`,
        method: 'post',
    },
};

export default API;
