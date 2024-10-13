import { jwtDecode } from "jwt-decode";

export const getBearerToken = () => {
    return `Bearer ${localStorage.getItem('bearerToken')}`
}

export const checkLoggedIn = () => {
    const token = localStorage.getItem('bearerToken');

    if (!token) {
        return false
    }
    try {
        const decoded: any = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            return false;
        }
        return true
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
}

export const saveLoginDetails = (token: string) => {
    localStorage.setItem('bearerToken', token);
}

export const logout = () => {
    localStorage.clear()
}