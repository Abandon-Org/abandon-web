import { listUsers } from '@/services/user';
import { Effect, Reducer } from 'umi';

interface UserMap {
  [key: string]: any;
}

interface UserModelType {
  namespace: string;
  state: {
    currentUser: any;
    userList: any[];
    currentUserList: any[];
    userMap: UserMap;
    userNameMap: UserMap;
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
    fetchUserActivities: Effect;
    fetchUserRecord: Effect;
    updateUser: Effect;
    deleteUser: Effect;
    fetchUserList: Effect;
    getGithubToken: Effect;
    avatar: Effect;
    queryUserStatistics: Effect;
    queryFollowTestPlanData: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    save: Reducer<any>;
    saveCurrentUser: Reducer<any>;
    changeNotifyCount: Reducer<any>;
  };
}

const getUserMap = (data: any[]) => {
  const temp: UserMap = {};
  const userNameMap: UserMap = {};
  data.forEach((item) => {
    temp[item.id] = item;
    userNameMap[item.id] = item.name;
  });
  return { userMap: temp, userNameMap };
};

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    userList: [],
    currentUserList: [],
    userMap: {},
    userNameMap: {},
    // 用户活动轨迹数据
    activities: [],
    operationLog: [],
    project_count: 0,
    case_count: 0,
    user_rank: 0,
    total_user: 0,
    weekly_case: [],
    // 关注的测试计划数据
    followPlan: [],
  },
  effects: {
    *fetchUserList(_, { call, put }) {
      const response = yield call(listUsers);
      if (response && response.data && Array.isArray(response.data.items)) {
        const { userMap, userNameMap } = getUserMap(response.data.items);
        yield put({
          type: 'save',
          payload: {
            userList: response,
            currentUserList: response,
            userMap,
            userNameMap,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    saveCurrentUser(state, action) {
      localStorage.setItem('pityUser', JSON.stringify(action.payload || {}));
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
