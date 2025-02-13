import { useFormik } from "formik";
import {BsArrowRight} from "react-icons/bs";
import { subscribeSchema } from "../schema/subscribeSchema";
const SubscribeInput = ()=>{
    const formik = useFormik({
        initialValues:{
            subscribe:''
        },
        validationSchema:subscribeSchema,
        onSubmit: (values)=>{
            console.log(values.subscribe)
        }
});
    return(
        <div>
            <label htmlFor="subscribe" className="text-[12px] font-bold">Subscribe & be the First to Shine with Our Sparking Offers!</label>
            <form onSubmit={formik.handleSubmit} className="flex items-center border justify-between border-black w-full h-full mt-2">
                <input value={formik.values.subscribe} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" name="subscribe" id="subscribe" className="w-full h-full outline-none px-2 font-sans"/>
                <button type="submit" className="px-3 bg-themeRed w-fit py-2 text-white text-2xl"><BsArrowRight/></button>
            </form>
            <p className="text-themeRed">{formik.touched && formik.errors.subscribe}</p>
        </div>
    )
}

export default SubscribeInput;