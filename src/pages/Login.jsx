import { useDispatch, useSelector } from "react-redux";
import { selectFooterStoreImg } from "../store/footerSlice";
import { useFormik } from "formik";
import { selectHeaderLogo } from "../store/headerSlice";
import { loginSchema } from "../schema/loginSchema";
import { loginUser } from "../store/AdminStore/auth";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const storeImg = useSelector(selectFooterStoreImg);
    const logo = useSelector(selectHeaderLogo)
    const { loading, error } = useSelector((state) => state.auth);
    const formik = useFormik({
        initialValues:{
            name:'',
            password:'',
        },
        validationSchema:loginSchema,
        onSubmit: async (values)=>{
           
        try{
            const result = await  dispatch(loginUser(values));
            console.log("result",result)
            console.log(values);
            formik.resetForm();
            if (result.meta.requestStatus === "fulfilled") {
                navigate('/admin');
              }
        }catch(error){
            console.log(error.message)
        }
        }
    })
    
    return(
        <div className="w-full h-screen">
            <div className="fixed w-80 h-10 bg-green-800 top-20 right-0 flex items-center px-5 py-6 text-white text-xl transition-transform translate-x-[0%] duration-500 ease-in-out">Login Successfully</div>
            <div className="w-full h-fit">
                <img src={logo} alt="" className="w-full h-full object-contain"/>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="w-full lg:w-10/12 px-5">
                    <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center">
                        <div className="w-full lg:w-1/2">
                            <img src={storeImg} alt="" />
                        </div>
                        <div className="w-full lg:w-1/2 border-2 border-gray-400/30 shadow-gray-400 shadow-sm p-5 font-mainFont1">
                            <div className="font-mainFont1 text-2xl text-center">
                                <h2>Login to Admin</h2>
                            </div>
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="name" className="text-lg font-medium cursor-pointer text-gray-600">Username</label>
                                    <input 
                                    onChange={formik.handleChange} 
                                    value={formik.values.name} 
                                    onBlur={formik.handleBlur}
                                    name="name" 
                                    type="text" 
                                    id="username" 
                                    className="w-full px-3 py-2 bg-gray-200 outline-none"
                                    />
                                    <p className="text-themeRed">{formik.touched && formik.handleBlur && formik.errors.username}</p>
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-lg font-medium cursor-pointer text-gray-600">Password</label>
                                    <input 
                                    onChange={formik.handleChange} 
                                    value={formik.values.password} 
                                    onBlur={formik.handleBlur}
                                    name="password" 
                                    type="password" 
                                    id="password" 
                                    className="w-full px-3 py-2 bg-gray-200 outline-none"
                                    />
                                     <p className="text-themeRed">{formik.touched && formik.handleBlur && formik.errors.password}</p>
                                </div>
                                <div className="text-center w-full lg:w-fit px-12 py-2 bg-green-800 text-white cursor-pointer hover:bg-themeRed/80">
                                    <button type="submit">{loading ? "Logging in..." : "Login"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;