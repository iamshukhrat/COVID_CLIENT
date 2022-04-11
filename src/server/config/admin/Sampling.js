import { HttpRequestHub } from '../../HttpRequestHub';

export const getSampling = () => {
    const config = {
        method: 'GET',
        url: `/api/admin/samplings`,
    }
    return HttpRequestHub(config);
}

export const createSampling = (obj) => {
    const config = {
        method: 'POST',
        url: `/api/admin/sampling/save`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const updateSampling = (id, obj) => {
    const config = {
        method: 'PUT',
        url: `/api/admin/sampling/edit/${id}`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const deleteSampling = (id) => {
    const config = {
        method: 'DELETE',
        url: `/api/admin/sampling/delete/${id}`,
    }
    return HttpRequestHub(config);
}