import { listUsers } from '@/services/user';

interface UserMap {
    [key: string]: any;
}

const getUserMap = (data: any[]) => {
    const temp: UserMap = {};
    const userNameMap: { [key: string]: string } = {};
    data.forEach(item => {
        temp[item.id] = item;
        userNameMap[item.id] = item.name;
    });
    return { userMap: temp, userNameMap };
}

interface UserModel {
    namespace: string;
    state: {
        currentUser: any;
        userList: any[];
        currentUserList: any[];
        userMap: UserMap;
        userNameMap: { [key: string]: string };
        activities: any[];
        operationLog: any[];
        project_count: number;
        case_count: number;
        user_rank: number;
        total_user: number;
        weekly_case: any[];
        followPlan: any[];
    };
    effects: {
        fetchUserList: (
            _: any,
            { call, put }: { call: any, put: any }
        ) => void;
    };
    // 添加reducers字段
    reducers: {
        save: (state: any, action: any) => any;
    };
}

const UserModel: UserModel = {
    namespace: 'user',
    state: {
        currentUser: {},
        userList: [],
        currentUserList: [],
        userMap: {},
        userNameMap: {},
        activities: [],
        operationLog: [],
        project_count: 0,
        case_count: 0,
        user_rank: 0,
        total_user: 0,
        weekly_case: [],
        followPlan: [],
    },
    effects: {
        *fetchUserList(_, { call, put }) {
            const response = yield call(listUsers);
            yield put({
                type: 'save',
                payload: {
                    userList: response.data.user_list,
                    currentUserList: response.data.user_list,
                },
            });
            // console.log(response.data.user_list);
        },
    },
    reducers: {
        save(state, {payload}) {
          return {...state, ...payload}
        }
  },
};

export default UserModel;
