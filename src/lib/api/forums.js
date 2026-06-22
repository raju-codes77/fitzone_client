const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getForums=async(forums)=>{

const res=await fetch(`${baseUrl}/forums`);
return res.json();

}