import * as yup from 'yup';

export const loginSchema = yup.object({
email:yup.string().email('Invalid Email').required("required"),
password:yup.string().min(6).max(15).required("required")
})

