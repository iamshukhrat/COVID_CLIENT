import { HttpRequestHub } from '../../HttpRequestHub';

export const getUsers = (page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/api/admin/users?page=${page}&size=${size}`,
    }
    return HttpRequestHub(config);
}
export const getUsersLike = (text, page = 0, size = 10) => {
    const config = {
        method: 'GET',
        url: `/api/admin/users/${text}?page=${page}&size=${size}`,
    }
    return HttpRequestHub(config);
}
export const createUsers = (obj) => {
    const config = {
        method: 'POST',
        url: `/api/admin/user/save`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const updateUsers = (id, obj) => {
    const config = {
        method: 'PUT',
        url: `/api/admin/user/edit/${id}`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const deleteUser = (id) => {
    const config = {
        method: 'DELETE',
        url: `/api/admin/user/delete/${id}`,
    }
    return HttpRequestHub(config);
}

export const reportUser = (username) => {
    const config = {
        method: 'GET',
        url: `/api/auth/report/${username}`,
    }
    return HttpRequestHub(config);
}