import {createStore} from 'vuex'
import {useFetch} from "@vueuse/core";

export default createStore({
    state: {
        ModalState: false as boolean,
        isError: false as boolean,
        isLoading: false as boolean,
        Users: [] as userType[]
    },
    getters: {},
    mutations: {
        loadState(state, value) {
            state.isLoading = value
        },
        loadUsers(state, value) {
            state.Users = value
        },
        setError(state, value) {
            state.isError = value
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
            dispatch("PrepareUsersPosts")
        },
        //Подготовка постов пользователя
        async PrepareUsersPosts({state, commit}) {

            let Data = [] as userType[]
            state.Users.map(async (p) => {
                const {
                    isFetching,
                    error,
                    data
                } = await useFetch(`${process.env.VUE_APP_API}/users/${p.id}/posts?_start=0&_limit=5`)
                if (error.value) {
                    commit("setError", true)
                } else {
                    p.Posts = JSON.parse(data.value as string)
                    Data.push(p)
                }
            })

            commit("loadState", false)
        }

    },
})
