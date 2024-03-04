import { getSessions } from "@/api/sessions";

const state = {
  sessions: null
};

const mutations = {
  SET_SESSIONS: (state, info) => {
    state.sessions = info;
  },
};

const actions = {
  getSessions({ commit }) {
    return new Promise((resolve, reject) => {
      getSessions()
        .then((res) => {
          const data = res;
          commit("SET_SESSIONS", data);
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};