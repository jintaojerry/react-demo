export function toggleCollapsed(item) {
    return {
        type: 'TOGGLE',
        item
    }
}


export function aaAction (payload) {
    return {
        type: 'AAACTION',
        payload
    }
}

export function bbAction (payload) {
    return {
        type: 'BBACTION',
        payload
    }
}