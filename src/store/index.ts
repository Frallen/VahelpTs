import {createStore} from 'vuex'
import {useFetch} from "@vueuse/core";
import {FetchUserPosts, overFlow} from "@/composables/mixins";

export default createStore({
    state: {
        ModalState: false as boolean,
        isError: false as boolean,
        isLoading: false as boolean,
        Users: [] as userType[]
    },
    getters: {
        preparedUsers(state): userType[] {
            return state.Users
        }
    },
    mutations: {
        loadState(state, value) {
            state.isLoading = value
        },
        loadUsers(state, value) {
            state.Users = value
        },
        setError(state, value) {
            state.isError = value
        },
        changeModalState(state, value:boolean) {
            overFlow(value)
            state.ModalState = value
        }
    },
    actions: {
        //Подготовка пользователей
        async PrepareUsers({state, commit, dispatch}) {
            commit("loadState", true)
            const {isFetching, error, data} = await useFetch(`${process.env.VUE_APP_API}/users?_start=0&_limit=10`)
            if (error.value) {
                commit("setError", true)
            } else {
                commit("loadUsers", JSON.parse(data.value as string) as userType[])

            }
          await   dispatch("PrepareUsersPosts")

        },
        //Подготовка постов пользователя
        async PrepareUsersPosts({state, commit}) {

            const users = state.Users;
            const data = await Promise.all(users.map(async (user) => {
                const posts = await FetchUserPosts(user.id);
                return { ...user, Posts: posts };
            }));
            commit("loadUsers", data)
            commit("loadState", false)
        },


    },
})
