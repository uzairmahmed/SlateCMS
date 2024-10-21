// api.ts
// import axios from 'axios';
import axiosInstance from './axiosInstance';
import { saveLoginDetails } from './auth';
import { toast } from 'react-toastify';
import { notifyWithCustomToast } from './utility';

export const loginUser = async (email: string, password: string) => {
    const data = JSON.stringify({ email, password });

    const config = {
        method: 'post',
        url: `/auth/login`,
        data: data,
    };

    try {
        const response = await axiosInstance.request(config);
        saveLoginDetails(response.data)
        await getNotifications()
        return true;
    } catch (error) {
        return false
    }
};

export const signUpUser = async (userType: string, email: string, password: string, name: string, phone: string) => {
    const data = {
        email: email,
        password: password,
        name: name,
        phone: phone
    }

    const config = {
        method: 'post',
        url: `/auth/register/${userType === 'teacher' ? 'teacher' : 'student'}`,
        data: data,
    };

    try {
        const response = await axiosInstance.request(config);
        toast('Created account')
        return true;
    } catch (error) {
        return false
    }
}


export const getCourses = async (userType: any, userId: any) => {
    try {
        const config = {
            method: 'get',
            url: `/courses?userType=${userType}&userId=${userId}`,
        };

        const response = await axiosInstance.request(config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCourseData = async (courseCode: string) => {
    try {
        const config = {
            method: 'get',
            url: `/courses/${courseCode}`,
        };
        const response = await axiosInstance.request(config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDiscussionData = async (discussionId: string) => {
    try {
        const config = {
            method: 'get',
            url: `/courses/discussions/${discussionId}`,
        };

        const response = await axiosInstance.request(config);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const replyToDiscussion = async (discussionId: string, msg: string) => {
    try {
        let data = {
            "message": msg
        }

        const config = {
            method: 'put',
            url: `/courses/discussions/${discussionId}`,
            data: data
        };

        const response = await axiosInstance.request(config);
        return true;
    } catch (error) {
        throw error;
    }
}

export const postAnnouncement = async (courseCode: string, title: string, message: string) => {
    try {
        let data = {
            "title": title,
            "message": message
        }

        const config = {
            method: 'post',
            url: `/courses/${courseCode}/announcements`,
            data: data
        };

        const response = await axiosInstance.request(config);
        toast('Posted announcement')
    } catch (error) {
        throw error;
    }
}

export const postContent = async (courseCode: string, title: string, rtf: string, files: File[], links: string[]) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('document', rtf);
        formData.append('links', JSON.stringify(links));

        files.forEach(file => {
            formData.append('files', file);
        });

        const config = {
            method: 'post',
            url: `/courses/${courseCode}/content`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };

        const response = await axiosInstance.request(config);
        toast('Posted content')
        if (JSON.stringify(response.data).length > 6500) toast.error('Your content may not be fully visible by SlateAI. Please split long lessons into multiple shorter ones.')
        return true
    } catch (error) {
        throw error;
    }
}

export const postDiscussion = async (courseCode: string, title: string, message: string) => {
    try {
        let data = {
            "title": title,
            "message": message,
        }

        const config = {
            method: 'post',
            url: `/courses/${courseCode}/discussions`,
            data: data
        };

        const response = await axiosInstance.request(config);
        toast('Posted discussion post')
    } catch (error) {
        throw error;
    }
}

export const createCourse = async (name: string, courseCode: string, description: string) => {
    try {
        let data = {
            "name": name,
            "courseCode": courseCode.trim(),
            "description": description
        }

        const config = {
            method: 'post',
            url: `/courses`,
            data: data
        };

        const response = await axiosInstance.request(config);
        toast('Created Course')
    } catch (error) {
        throw error;
    }
}


export const getStudents = async () => {
    try {
        const config = {
            method: 'get',
            url: `/users/students`,
        };

        const response = await axiosInstance.request(config);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const assignStudentsToCourse = async (courseCode: string, studentIds: string[]) => {
    try {
        let data = {
            "studentIds": studentIds,
        }

        const config = {
            method: 'post',
            url: `/courses/${courseCode}/assign-students`,
            data: data
        };
        const response = await axiosInstance.request(config);
        toast('Assigned Students to Course')
    } catch (error) {
        throw error;
    }

}


export const getTeachers = async () => {
    try {
        const config = {
            method: 'get',
            url: `/users/teachers`,
        };

        const response = await axiosInstance.request(config);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const assignTeachersToCourse = async (courseCode: string, teacherIds: string[]) => {
    try {
        let data = {
            "teacherIds": teacherIds,
        }

        const config = {
            method: 'post',
            url: `/courses/${courseCode}/assign-teachers`,
            data: data
        };
        const response = await axiosInstance.request(config);
        toast('Assigned Teachers to Course')
    } catch (error) {
        throw error;
    }

}

export const getAllContent = async () => {
    try {
        const config = {
            method: 'get',
            url: `/courses/content/all`,
        };

        const response = await axiosInstance.request(config);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getNotifications = async () => {
    try {
        const config = {
            method: 'get',
            url: `/notifications`,
        };

        const response = await axiosInstance.request(config);
        const notifications = response.data
        notifications.forEach(notification => {
            notifyWithCustomToast(notification.message, notification._id)
        });
    } catch (error) {
        throw error;
    }
}

export const searchWithQuery = async (query: string, searchWeb: boolean, userId: any) => {
    try {
        let data = {
            "query": query,
            "searchWeb": searchWeb,
            "userId": userId
        }
        const config = {
            method: 'post',
            url: `/knowledge/search`,
            data: data
        };

        const response = await axiosInstance.request(config);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const getChatHistory = async (userId: any) => {
    try {
        const config = {
            method: 'get',
            url: `/users/${userId}/chat-history`,
        };

        const response = await axiosInstance.request(config);
        return response.data
    } catch (error) {
        throw error;
    }
}

export const markNotificationAsRead = async (notificationId: string) => {
    try {
        const config = {
            method: 'delete',
            url: `/notifications/${notificationId}`,
        };

        const response = await axiosInstance.request(config);
        return true
    } catch (error) {
        throw error;
    }
}