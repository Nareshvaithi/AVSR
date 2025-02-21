import * as yup from "yup"

export const loginSchema =  yup.object().shape({
    name: yup
            .string()
            .required('Please Enter Your username'),
    password: yup
            .string()
            .required("Please Enter Your Password")
})