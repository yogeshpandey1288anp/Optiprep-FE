const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


export const registerUser = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  role: "user";
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const body = await safeJson(res);

  if (!res.ok) {
    throw new Error(body?.detail || "Registration failed");
  }

  return body;
};

export const loginUser = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  const body = await safeJson(res);

  if (!res.ok) {
    throw new Error(body?.detail || "Invalid email or password");
  }

 
  return body;
};


export const getUserProfile = async (token: string) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const res = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await safeJson(res);

  if (!res.ok) {
    throw new Error(body?.detail || "Unauthorized");
  }

  return body;
};

const safeJson = async (res: Response) => {
  const text = await res.text();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};
