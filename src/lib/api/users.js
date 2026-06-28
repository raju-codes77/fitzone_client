const baseUrl=process.env.NEXT_PUBLIC_BASE_URL;

export const getUsers=async(Users)=>{

const res=await fetch(`${baseUrl}/users`);
return res.json();

}

export const getAllNormalUsers = async () => {
  const users = await getUsers();

  return users.filter(
    (user) => user.role === "user"
  );
};

//demote trainer to user

export const demoteTrainer = async (id) => {
  const res = await fetch(
    `${baseUrl}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "user",
      }),
    }
  );

  return res.json();
};

//promote user to admin

export const promoteUser = async (id) => {
  const res = await fetch(
    `${baseUrl}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: "admin",
      }),
    }
  );

  return res.json();
};
//user block
export const blockUser = async (id) => {
  const res = await fetch(
    `${baseUrl}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isBlocked: true,
      }),
    }
  );

  return res.json();
};

//user unblock
export const unblockUser = async (id) => {
  const res = await fetch(
    `${baseUrl}/users/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isBlocked: false,
      }),
    }
  );

  return res.json();
};