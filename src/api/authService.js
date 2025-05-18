import { BASE_URL } from "../constants/constants";

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Registration failed: ${data.message ? data.message : data.errors[0].msg}`);
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Login failed: ${data.message ? data.message : data.errors[0].msg}`);
  }

  return data;
};
