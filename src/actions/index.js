export const navitateTo = path => {
    return {
        type: 'NAVIGATOR_TO',
        path:path,
    }
}

export const drawerToggleAction = open => {
    return {
        type: 'DRAWER_TOGGLE',
        open:open,
    }
}

export const changeViewMethod = method => {
    return {
        type: 'CHANGE_VIEW_METHOD',
        method:method,
    }
}

export const changeSortMethod = method => {
    return {
        type: 'CHANGE_SORT_METHOD',
        method:method,
    }
}

export const updateFileList = list => {
    return {
        type: 'UPDATE_FILE_LIST',
        list:list,
    }
}