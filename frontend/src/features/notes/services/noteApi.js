export const createNote = async (data) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notes`, {
    method: "POST",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};

export const getNote = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/notes/${id}`)
  const data = await response.json()
  return data
}