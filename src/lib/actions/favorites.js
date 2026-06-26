const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const toggleFavorite = async(data) => {

  const res = await fetch(
    `${baseUrl}/favorites`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return res.json();

};

export const getFavorites = async(userId) => {

  const res = await fetch(
    `${baseUrl}/favorites/${userId}`
  );

  return res.json();

};