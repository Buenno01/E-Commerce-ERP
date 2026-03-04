import jwt from "jsonwebtoken";

export const getAuthenticatedUser = (authorizationHeader?: string) => {
  if (!authorizationHeader?.startsWith("Bearer ")) return null;

  const token = authorizationHeader.replace("Bearer ", "");

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      email: string;
    };
  } catch {
    return null;
  }
};
