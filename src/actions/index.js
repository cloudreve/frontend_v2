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