export const SET_CURRENT_ROOM = 'SET_CURRENT_ROOM';
export const SET_RETURN_URL = 'SET_RETURN_URL';

export const setCurrentRoom = (roomId) => ({
    type: SET_CURRENT_ROOM,
    payload: roomId
});

export const setReturnUrl = (url) => ({
    type: SET_RETURN_URL,
    payload: url
});
