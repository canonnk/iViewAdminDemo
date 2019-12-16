import { doCustomTimes } from '@/libs/util'

export const getTableDemo2Data = res => {
    let data = []
    doCustomTimes(1, () => {
        for (let index = 0; index < 1000; index++) {
            data.push({
                id: index,
                name: 'name' + (index + 1),
                desc: 'desc' + (index + 1)
            })
        }
    })
    return data
}
