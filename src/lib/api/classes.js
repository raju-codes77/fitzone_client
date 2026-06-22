const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getClasses=async(classes)=>{

const res=await fetch(`${baseUrl}/classes`);
return res.json();

}