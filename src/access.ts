export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
    const {currentUser} = initialState;
    console.log(currentUser)
    return {
        // 判断用户是否为超级管理员
        isAdmin: currentUser && currentUser.usr_info.role === 2,
        // // 判断用户是否为组长
        isLeader: currentUser && currentUser.usr_info.role === 1,
        // 判断用户是否为普通用户
        isUser: currentUser && currentUser.usr_info.role === 0,
        // 判断用户是管理员
        isAdminOrLeader: currentUser && currentUser.usr_info.role !== 0,
        // 判断用户不是超级管理员
        isUserOrLeader: currentUser && currentUser.usr_info.role !== 2,
    };
}