

import { authClient } from "../auth-client";


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const createClass = async (newClass) => {
       const token=localStorage.getItem("token");

       const res = await fetch(`${baseUrl}/classes`, {

              method: 'POST',
              headers: {
                     'Content-Type': 'application/json',
                     authorization: `Bearer ${token}`
              },
              body: JSON.stringify(newClass)

       })
       return await res.json();
}