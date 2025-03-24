import * as Yup from "yup";

export const moderatorLoginSchema = Yup.object().shape({
    email: Yup.string().required("Email Is Required").email("Enter a Valid Email"),
    password: Yup.string().required("Password Is Required").min(6, "Password Must Be At Least 6 Characters").max(16, "Password Should Be Must Under 16 Characters"),
});
