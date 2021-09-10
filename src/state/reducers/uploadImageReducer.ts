const captureReducer = (state = '', action:any) => {
    switch (action.type) {
        case 'ADD':
            return action.payload
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export default captureReducer;