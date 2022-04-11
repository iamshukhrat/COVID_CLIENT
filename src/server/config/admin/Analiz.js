import { HttpRequestHub } from '../../HttpRequestHub';

export const getAnalizByUserId = (userId=1) => {
    const config = {
        method: 'GET',
        url: `/api/auth/analiz/user/${userId}`,
    }
    return HttpRequestHub(config);
}
