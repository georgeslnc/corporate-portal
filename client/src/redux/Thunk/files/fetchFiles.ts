export const fetchFiles = async () => {
  const response = await fetch("http://localhost:3000/documents/all", {
    credentials: "include",
  });
  const files = await response.json();

  return files;
};