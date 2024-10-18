// utils/icpAuthClient.js

import { AuthClient } from "@dfinity/auth-client";

let authClient: AuthClient | null = null;

// Function to initialize the AuthClient
export const initAuthClient = async () => {
  if (!authClient) {
    authClient = await AuthClient.create();
  }
  return authClient;
};

// Function to get the user's identity
export const getIdentity = async () => {
  try {
    const client = await initAuthClient();
    // Check if the user is authenticated
    if (!client.isAuthenticated()) {
      // If not authenticated, you might want to handle login here
      console.log("User is not authenticated.");
      return null;
    }

    // Get the identity
    const identity = client.getIdentity();
    return identity.getPrincipal().toString(); // Return the principal as a string
  } catch (error) {
    console.error("Failed to fetch identity:", error);
    return null;
  }
};
