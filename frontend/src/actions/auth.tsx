export const login = (uid = '', displayName : string = '') => ({
    type: 'LOGIN',
    uid,
    displayName
});

export const logout = () => ({
    type: 'LOGOUT'
});