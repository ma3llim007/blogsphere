import { isValidExtensions, isValidFileType } from "@/utils/utils";
import * as Yup from "yup";

// Validation schema for the login form
export const adminLoginSchema = Yup.object().shape({
    email: Yup.string().required("Email Is Required").email("Enter a Valid Email"),
    password: Yup.string().required("Password Is Required").min(6, "Password Must Be At Least 6 Characters").max(16, "Password Should Be Must Under 16 Characters"),
});

export const addModeratorSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Is Required").min(3, "First Name Must Be At Least 3 Characters Long"),
    lastName: Yup.string().required("Last Name Is Required").min(3, "Last Name Must Be At Least 3 Characters Long"),
    email: Yup.string().required("Email Is Required").email("Please Enter A Valid Email Address"),
    username: Yup.string().required("Username Is Required").min(3, "Username Must Be At Least 3 Characters Long").matches(/^\S*$/, "Username Cannot Contain Spaces"),
    phoneNumber: Yup.string()
        .required("Phone Number Is Required")
        .matches(/^[0-9]{10,15}$/, "Phone Number Must Be Between 10 and 15 digits"),
    password: Yup.string()
        .required("Password Is Required")
        .max(20, "Password Must Be Less Than 20 Characters Long")
        .matches(/[A-Z]/, "Password Must Contain At Least One Uppercase Letter")
        .matches(/[a-z]/, "Password Must Contain At Least One Lowercase Letter")
        .matches(/[0-9]/, "Password Must Contain At Least One Number")
        .matches(/[@$!%*?&]/, "Password Must Contain At Least One Special Character (@, $, !, %, *, ?, &)"),
});

export const addWriterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Is Required").min(3, "First Name Must Be At Least 3 Characters Long"),
    lastName: Yup.string().required("Last Name Is Required").min(3, "Last Name Must Be At Least 3 Characters Long"),
    email: Yup.string().required("Email Is Required").email("Please Enter A Valid Email Address"),
    username: Yup.string().required("Username Is Required").min(3, "Username Must Be At Least 3 Characters Long").matches(/^\S*$/, "Username Cannot Contain Spaces"),
    phoneNumber: Yup.string()
        .required("Phone Number Is Required")
        .matches(/^[0-9]{10,15}$/, "Phone Number Must Be Between 10 and 15 digits"),
    password: Yup.string()
        .required("Password Is Required")
        .max(20, "Password Must Be Less Than 20 Characters Long")
        .matches(/[A-Z]/, "Password Must Contain At Least One Uppercase Letter")
        .matches(/[a-z]/, "Password Must Contain At Least One Lowercase Letter")
        .matches(/[0-9]/, "Password Must Contain At Least One Number")
        .matches(/[@$!%*?&]/, "Password Must Contain At Least One Special Character (@, $, !, %, *, ?, &)"),
});

export const addCategoryScheme = Yup.object().shape({
    categoryName: Yup.string()
        .required("Category Name Is Required")
        .min(3, "Category At Least Have More Than 3 Characters")
        .matches(/^[A-Za-z\s]+$/, "Category Name Must Only Contain Letters"),
    categorySlug: Yup.string().required("Category Slug Is Required"),
    categoryImage: Yup.mixed()
        .required("Category Image Is Required")
        .test("fileType", "Unsupported file format", value => isValidFileType(value)),
});

export const editCategorySchema = Yup.object().shape({
    categoryName: Yup.string()
        .required("Category Name Is Required")
        .min(3, "Category At Least Have More Than 3 Characters")
        .matches(/^[A-Za-z\s]+$/, "Category Name Must Only Contain Letters"),
    categorySlug: Yup.string().required("Category Slug Is Required"),
    categoryImage: Yup.mixed().test("fileType", "Unsupported file format", value => {
        return !value || isValidExtensions(value);
    }),
});
