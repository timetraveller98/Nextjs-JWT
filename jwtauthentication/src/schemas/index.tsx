import * as yup from 'yup';

export const signupSchema = yup.object({
name:yup.string().min(3,'Too Short').max(25, 'Too Long').required("required"),
email:yup.string().email('Invalid Email').required("required"),
password:yup.string().min(6).max(15).required("required")
})

