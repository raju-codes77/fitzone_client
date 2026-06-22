'use server'


const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;
export const  createClass=async(newClass)=>{
       const res=await fetch(`${baseUrl}/classes`,{

              method:'POST',
              headers:{
                     'Content-Type':'application/json',
              },
              body:JSON.stringify(newClass)

       })
       return await res.json();
}