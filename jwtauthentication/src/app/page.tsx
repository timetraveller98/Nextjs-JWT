'use client'
import { loginSchema } from '@/schemas/login'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

const Login = () => {

    const router = useRouter();

    //Login  Form Handling By Formik

    const initialValues = {
        email: "",
        password: "",
    }
    const { values, errors, handleChange, handleSubmit, handleBlur, touched }: any = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values: any) => {
            let response = await fetch("http://localhost:3000/api/login", {
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
            if (!data.success) {
                alert("Invalid Credentials")
            } else {

                router.push('/welcome')
            }
        }


    })

    // END

    return (<>
        <h1 style={{ textAlign: 'center', marginTop: '15px' }}>LOGIN</h1>
        <div id='formatData'>
            <form onSubmit={handleSubmit}>
                <input type="email" name='email' onBlur={handleBlur} value={values.email} autoComplete='off' onChange={handleChange} placeholder="Email" /><br />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
                <input type="password" name='password' onBlur={handleBlur} value={values.password} autoComplete='off' onChange={handleChange} placeholder="Password" /><br />
                {errors.password && touched.password ? <p>{errors.password}</p> : null}
                <button type='submit' >Submit</button>
            </form>
        </div></>
    )

}
export default Login;