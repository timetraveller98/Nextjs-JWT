'use client'
import { signupSchema } from '@/schemas'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

const Signup = () => {

    const router = useRouter();

    //  Form Handling By Formik
    const initialValues = {
        name: "",
        email: "",
        password: "",
    }
    const { values, errors, handleChange, handleSubmit, handleBlur, touched }: any = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: async (values: any) => {
            let response = await fetch("http://localhost:3000/api/signup", {
                method: "POST",
                body: JSON.stringify(values),
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();
            if (data.success && data.token) {
                alert("Thank You !")
                router.push('/')
              //  localStorage.setItem('token',JSON.stringify(data.token)) 
            }else{
                alert("User Already Resistered")  
             }}})

    // END

    return (<>
        <h1 style={{ textAlign: 'center', marginTop: '15px' }}>SIGN UP</h1>
        <div id='formatData'>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' onBlur={handleBlur} value={values.name} autoComplete='off' onChange={handleChange} placeholder="Name" /><br />
                {errors.name && touched.name ? <p>{errors.name}</p> : null}
                <input type="email" name='email' onBlur={handleBlur} value={values.email} autoComplete='off' onChange={handleChange} placeholder="Email" /><br />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
                <input type="password" name='password' onBlur={handleBlur} value={values.password} autoComplete='off' onChange={handleChange} placeholder="Password" /><br />
                {errors.password && touched.password ? <p>{errors.password}</p> : null}
                <button type='submit' >Submit</button>
            </form>
        </div></>
    )

}
export default Signup;