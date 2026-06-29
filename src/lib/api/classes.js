const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getClasses = async () => {
  const res = await fetch(`${baseUrl}/classes`);
  return res.json();
};
//pagination
export const paginationClasses=async(page)=>{
  if(!page){
    page=1;
  }

const res=await fetch(`${baseUrl}/pagination/classes?page=${page}`);
return res.json();

}
// Approve class
export const approveClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/approve/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Approved" }),
  });
  const data = await res.json();
  console.log("Approve response:", data);
  return data;
};

// Reject class
export const rejectClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/reject/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "Rejected" }),
  });
  const data = await res.json();
  console.log("Reject response:", data);
  return data;
};

// Delete class
export const deleteClass = async (id) => {
  const res = await fetch(`${baseUrl}/classes/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  console.log("Delete response:", data);
  return data;
};