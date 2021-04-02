

export const setFormSearch=(state:any, action:any)=> {
  return {
    ...state ,
    formSearch: {...state?.formSearch, [action.payload.dataIndex]: action.payload.value}
  }
}

/**
 * 设置state属性通用函数
 * @param state
 * @param action ，payload.dataIndex为属性名称
 *
 */
export const setSateProperty=(state:any, action:any)=> {
  console.log(action)
  return {
    ...state ,
    [action.payload.dataIndex]: action.payload.value,
  }
}
