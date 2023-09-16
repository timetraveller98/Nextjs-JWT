'use client'
import {useState,useEffect} from 'react';
import axios from 'axios';


const Welcome = ()=>{
    const [product,setProduct]= useState<any[]>([]);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users'
        ,{
            headers:{
            authorization:JSON.parse(localStorage.getItem('token'))}
        }
        ).then((res:any)=>setProduct(res.data)).catch((err:any)=>console.log(err))
    },[])
return(
    <>
    <h1>Welcome Sir !</h1>
    {
        product.map((item:any)=>(
            <h1 key={item.id}>{item.name}</h1>
        ))
    }

    </>
)
}
export default Welcome;