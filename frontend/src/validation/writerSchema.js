import * as Yup from "yup";

export const updateWriterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Is Required").min(3, "First Name Must Be At Least 3 Characters Long"),
    lastName: Yup.string().required("Last Name Is Required").min(3, "Last Name Must Be At Least 3 Characters Long"),
    email: Yup.string().required("Email Is Required").email("Please Enter A Valid Email Address"),
    username: Yup.string().required("Username Is Required").min(3, "Username Must Be At Least 3 Characters Long").matches(/^\S*$/, "Username Cannot Contain Spaces"),
    phoneNumber: Yup.string()
        .required("Phone Number Is Required")
        .matches(/^[0-9]{10,15}$/, "Phone Number Must Be Between 10 and 15 digits"),
});
