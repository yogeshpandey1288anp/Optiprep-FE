/* =========================
   API CONFIG
========================= */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

/* =========================
   COMMON TYPES
========================= */

export interface ApiError {
  detail?: string;
  message?: string;
}

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

/* =========================
   HELPER FUNCTION
========================= */

const handleResponse = async <T>(res: Response): Promise<T> => {
  if (!res.ok) {
    let errorMessage = "Something went wrong";

    try {
      const errorData: ApiError = await res.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
    } catch {
      // fallback for non-JSON errors
    }

    throw new Error(errorMessage);
  }

  return res.json();
};

/* =========================
   REGISTER USER
========================= */

export const registerUser = async (
  payload: RegisterPayload
): Promise<{ message: string }> => {
  const res = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
};

/* =========================
   LOGIN USER
========================= */

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const formData = new URLSearchParams({
    username: email,
    password,
  });

  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  return handleResponse(res);
};

/* =========================
   LOGOUT (OPTIONAL)
========================= */

export const logoutUser = async () => {
  // for future token revocation endpoint
  return Promise.resolve(true);
};





