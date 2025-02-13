import * as yup from "yup"
export const subscribeSchema = yup.object().shape({
    subscribe: yup
            .string().
            email("Please Enter Valid Email")
            .required("Please Enter You Email")
})  