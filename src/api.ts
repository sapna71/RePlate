
const API_BASE_URL = "http://127.0.0.1:8000";

// Common function for communicating with the FastAPI backend
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("access_token");

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    let message = errorText || `Request failed: ${response.status}`;

    try {
      const parsed = JSON.parse(errorText);
      message = parsed.detail || message;
    } catch {
      // Keep the original error message
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// Sign up a new user
export async function signupUser(userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  category?: "individual" | "organization" | "wholesaler";
  address?: string;
}) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Log in and save the authentication token
export async function loginUser(email: string, password: string) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("access_token", data.access_token);

  try {
    return await apiRequest("/auth/me");
  } catch (error) {
    localStorage.removeItem("access_token");
    throw error;
  }
}

// Log out
export function logoutUser() {
  localStorage.removeItem("access_token");
}

// Fetch the currently logged-in user
export async function getCurrentUser() {
  return apiRequest("/auth/me");
}

// Fetch food listings
export async function getFoodListings() {
  return apiRequest("/api/food/");
}

// Create a food listing
export async function createFoodListing(foodData: {
  title: string;
  description: string;
  quantity: string;
  servings: number;
  expiry_date: string;
  location: string;
  category: string;
  is_urgent?: boolean;
  photos?: string;
}) {
  return apiRequest("/api/food/", {
    method: "POST",
    body: JSON.stringify(foodData),
  });
}

// Fetch food requests
export async function getFoodRequests() {
  return apiRequest("/api/requests/");
}

// Get a request's QR code
export async function getRequestQR(requestId: string) {
  return apiRequest(`/api/requests/${requestId}/qr`);
}


export async function createFoodRequest(foodListingId: string) {
  return apiRequest("/api/requests/", {
    method: "POST",
    body: JSON.stringify({
      food_listing_id: foodListingId,
    }),
  });
}

export async function confirmPickup(token: string) {
  return apiRequest("/api/requests/confirm-pickup", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function getMyNotifications() {
  return apiRequest("/api/notifications/me");
}