export async function fetcher(path) {
  try {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
}