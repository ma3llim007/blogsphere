import * as Yup from "yup";

const enquirySchema = Yup.object().shape({
    name: Yup.string().trim().required("Name Is Required"),
    email: Yup.string().trim().email("Invalid Email Address").required("Email Is Required"),
    phoneNumber: Yup.string().trim().required("Phone Number Is Required"),
    subject: Yup.string().trim().required("Subject Is Required"),
    message: Yup.string().trim().required("Message Is Required"),
});

export { enquirySchema };
