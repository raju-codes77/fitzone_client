import { useSession } from "../auth-client";

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getPaymentData=async(payment)=>{

const res=await fetch(`${baseUrl}/subscription`);
return res.json();

}

 
export const userBookedClasses=async(userId)=>{

       const res=await fetch(`${baseUrl}/subscription/${userId}`);
       return res.json();
}