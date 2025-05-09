import * as Yup from "yup";

export const moderatorLoginSchema = Yup.object().shape({
    email: Yup.string().required("Email Is Required").email("Enter a Valid Email"),
    password: Yup.string().required("Password Is Required").min(6, "Password Must Be At Least 6 Characters").max(16, "Password Should Be Must Under 16 Characters"),
});

export const moderatorChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password Is Required")
        .max(20, "Password Must Be Less Than 20 Characters Long")
        .matches(/[A-Z]/, "Password Must Contain At Least One Uppercase Letter")
        .matches(/[a-z]/, "Password Must Contain At Least One Lowercase Letter")
        .matches(/[0-9]/, "Password Must Contain At Least One Number")
        .matches(/[@$!%*?&]/, "Password Must Contain At Least One Special Character (@, $, !, %, *, ?, &)"),
});

export const moderatorBlogVerifyScheme = Yup.object().shape({
    blogStatus: Yup.string().required("Blog status is required").oneOf(["Approved", "Needs Revisions", "Rejected"], "Invalid Status"),
    revisionMessage: Yup.string().when("blogStatus", { is: "Needs Revisions", then: schema => schema.required("Revision Message Is Required"), otherwise: schema => schema.notRequired() }),
    rejectedMessage: Yup.string().when("blogStatus", { is: "Rejected", then: schema => schema.required("Rejection Message Is Required"), otherwise: schema => schema.notRequired() }),
});
