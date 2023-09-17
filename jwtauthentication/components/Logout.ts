'use server'
import { cookies } from 'next/headers'

const Logout =async()=> {
  cookies().delete('token')
 

}
export default Logout;