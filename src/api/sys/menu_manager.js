import axios from '@/libs/api.request'

export const sys_getMenuTree = () => {
    return axios.request({
        url: 'sys/getMenuTree',
        method: 'get'
    })
}
