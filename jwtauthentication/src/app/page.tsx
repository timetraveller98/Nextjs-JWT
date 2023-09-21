'use client'
import {useState,useEffect} from 'react';
import axios from 'axios';

const Welcome = ()=>{
   // const cookieStore = cookies();
    const [product,setProduct]= useState<any[]>([]);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users'
        ).then((res:any)=>setProduct(res.data)).catch((err:any)=>console.log(err))
    },[product])
return(
    <>
    <h1 style={{textAlign:'center',margin:'10px'}}>Welcome Sir !</h1>
    {
        product.map((item:any)=>(
            <h3 style={{textAlign:'center',margin:'10px'}} key={item.id}>{item.name}</h3>
        ))
    }

    </>
)
}
export default Welcome;