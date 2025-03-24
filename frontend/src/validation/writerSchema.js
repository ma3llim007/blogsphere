import { WRITER_BLOG_STATUSES } from "@/utils/statusUtils";
import { isValidExtensions, isValidFileType } from "@/utils/utils";
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

export const changePasswordWriterSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password Is Required")
        .max(20, "Password Must Be Less Than 20 Characters Long")
        .matches(/[A-Z]/, "Password Must Contain At Least One Uppercase Letter")
        .matches(/[a-z]/, "Password Must Contain At Least One Lowercase Letter")
        .matches(/[0-9]/, "Password Must Contain At Least One Number")
        .matches(/[@$!%*?&]/, "Password Must Contain At Least One Special Character (@, $, !, %, *, ?, &)"),
});

export const addBlogScheme = Yup.object().shape({
    blogTitle: Yup.string().required("Blog Title Is Required").min(3, "Blog Title Atleast Have More Than 3 Characters"),
    blogSlug: Yup.string().required("Blog Slug Is Required"),
    blogFeatureImage: Yup.mixed()
        .required("Blog Feature Image Is Required")
        .test("fileType", "Unsupported file format", value => isValidFileType(value)),
    blogShortDescription: Yup.string().min(5, "Blog Short Description Atleast Have More Than 5 Characters").required("Blog Short Description is required"),
    blogDescription: Yup.string().min(5, "Blog Description Atleast Have More Than 3 Characters").required("Blog Description is required"),
    blogCategory: Yup.string().required("Blog Category Is Required").notOneOf(["", "default"], "You Must Select A Valid Category"),
    blogStatus: Yup.string()
        .oneOf(WRITER_BLOG_STATUSES, `Status Must Be One Of The Following: ${WRITER_BLOG_STATUSES.join(", ")}`)
        .required("Blog status is required"),
});

export const editBlogScheme = Yup.object().shape({
    blogTitle: Yup.string().required("Blog Title Is Required").min(3, "Blog Title Atleast Have More Than 3 Characters"),
    blogSlug: Yup.string().required("Blog Slug Is Required"),
    blogFeatureImage: Yup.mixed().test("fileType", "Unsupported file format", value => {
        return !value || isValidExtensions(value);
    }),
    blogShortDescription: Yup.string().min(5, "Blog Short Description Atleast Have More Than 5 Characters").required("Blog Short Description is required"),
    blogDescription: Yup.string().min(5, "Blog Description Atleast Have More Than 3 Characters").required("Blog Description is required"),
    blogCategory: Yup.string().required("Blog Category Is Required").notOneOf(["", "default"], "You Must Select A Valid Category"),
    blogStatus: Yup.string()
        .oneOf(WRITER_BLOG_STATUSES, `Status Must Be One Of The Following: ${WRITER_BLOG_STATUSES.join(", ")}`)
        .required("Blog status is required"),
});
