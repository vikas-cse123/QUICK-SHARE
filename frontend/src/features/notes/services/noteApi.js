export const createNote = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();  console.log(response);
  return data;
};
