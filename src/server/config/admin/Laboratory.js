import { HttpRequestHub } from '../../HttpRequestHub';

export const getLaboratories = () => {
    const config = {
        method: 'GET',
        url: `/api/admin/laboratories`,
    }
    return HttpRequestHub(config);
}

export const createLaboratory = (obj) => {
    const config = {
        method: 'POST',
        url: `/api/admin/laboratory/save`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const updateLaboratory = (id, obj) => {
    const config = {
        method: 'PUT',
        url: `/api/admin/laboratory/edit/${id}`,
        data: { ...obj }
    }
    return HttpRequestHub(config);
}

export const deleteLaboratory = (id) => {
    const config = {
        method: 'DELETE',
        url: `/api/admin/laboratory/delete/${id}`,
    }
    return HttpRequestHub(config);
}