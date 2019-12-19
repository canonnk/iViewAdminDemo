// 获取菜单数据项列表
export const sys_getMenuTree = req => {
    const data = [
        { id: '1', text: 'menu 1', parent: null },
        { id: '2', text: 'menu 1-1', parent: '1' },
        { id: '3', text: 'menu 1-2', parent: '1' },
        { id: '4', text: 'menu 1-2-1', parent: '3' },
        { id: '5', text: 'menu 1-2-2', parent: '3' },
        { id: '6', text: 'menu 1-2-2-1', parent: '5' },
        { id: '7', text: 'menu 1-2-2-2', parent: '5' },
        { id: '8', text: 'menu 1-2-2-3', parent: '5' },
        { id: '9', text: 'menu 1-2-3', parent: '3' },
        { id: '10', text: 'menu 1-3', parent: '1' },
        { id: '11', text: 'menu 1-4', parent: '1' },
        { id: '12', text: 'menu 2', parent: null },
        { id: '13', text: 'menu 2-1', parent: '12' },
        { id: '14', text: 'menu 2-2', parent: '12' },
        { id: '15', text: 'menu 2-3', parent: '12' },
        { id: '16', text: 'menu 2-4', parent: '12' },
        { id: '17', text: 'menu 2-5', parent: '12' },
        { id: '18', text: 'menu 2-6', parent: '12' },
        { id: '19', text: 'menu 2-7', parent: '12' },
        { id: '20', text: 'menu 2-8', parent: '12' },
        { id: '21', text: 'menu 2-9', parent: '12' },
        { id: '22', text: 'menu 2-10', parent: '12' },
        { id: '23', text: 'menu 2-11', parent: '12' },
        { id: '24', text: 'menu 3', parent: null },
        { id: '25', text: 'menu 4', parent: null },
        { id: '26', text: 'menu 5', parent: null }]
    return data
}
