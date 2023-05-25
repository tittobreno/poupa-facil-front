import jwtDecode from "jwt-decode";
import api from "../services/api";

interface JwtPayload {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken || typeof decodedToken.exp !== "number") {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (error: any) {
    console.log("Erro ao decodificar o token:", error);
    return true;
  }
};
