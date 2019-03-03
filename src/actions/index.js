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

export const changeContextMenu = (type,open) => {
    return {
        type: 'CHANGE_CONTEXT_MENU',
        menuType:type,
        open:open,
    }
}

export const addSelectedTarget = targets => {
    return {
        type: 'ADD_SELECTED_TARGET',
        targets:targets,
    }
}

export const setSelectedTarget = targets => {
    return {
        type: 'SET_SELECTED_TARGET',
        targets:targets,
    }
}

export const removeSelectedTarget = id => {
    return {
        type: 'RMOVE_SELECTED_TARGET',
        id:id,
    }
}

export const setNavigatorLoadingStatus = status => {
    return {
        type: 'SET_NAVIGATOR_LOADING_STATUE',
        status:status,
    }
}

export const setNavigatorError = (status,msg) => {
    return {
        type: 'SET_NAVIGATOR_ERROR',
        status:status,
        msg:msg,
    }
}