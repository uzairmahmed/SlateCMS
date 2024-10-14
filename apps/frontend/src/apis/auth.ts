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

export const getUserDetails = () => {
    return {
        email: localStorage.getItem('email'),
        userType: localStorage.getItem('userType'),
        userId: localStorage.getItem('userId')
    }
}

export const saveLoginDetails = (data: any) => {
    localStorage.setItem('bearerToken', data.token);
    localStorage.setItem('email', data.user.email)
    localStorage.setItem('userType', data.user.userType)
    localStorage.setItem('userId', data.user._id)
}

export const saveCourseDetails = (data: any) => {
    const list = data.map((course: any) => (
        {
            courseCode: course.courseCode,
            name: course.name,
            url: `/${course.courseCode}`,
        }
    ))
    
    localStorage.setItem('courses', JSON.stringify(list)); 
}

export const logout = () => {
    localStorage.clear()
}