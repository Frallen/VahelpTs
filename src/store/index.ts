import {createStore} from 'vuex'
import {useFetch} from "@vueuse/core";
import {FetchUserPosts} from "@/composables/mixins";

export default createStore({
    state: {
        ModalState: {edit: false, show: false} as modalType,
        isError: false as boolean,
        isLoading: false as boolean,
        Users: [] as userType[],
        EditableCell: {} as postType,
        DraggedCell: {} as postType
    },
    getters: {
        preparedUsers(state): userType[] {
            return state.Users
        },
        preparedModalContent(state): postType {
            return state.EditableCell
        },
        preparedCell(state): postType {
            return state.DraggedCell
        }
    },
    mutations: {
        loadState(state, value: boolean) {
            state.isLoading = value
        },
        loadUsers(state, value) {
            state.Users = value
        },
        setError(state, value) {
            state.isError = value
        },
        changeModalState(state, value: modalType) {
            state.ModalState = value
        },
        changeEditableCell(state, value: postType) {
            state.EditableCell = value
        },
        setDragElement(state, elem: postType) {
            state.DraggedCell = elem
        },
        AddPost(state, value: postType) {
            state.Users = state.Users.map(p => {
                if (p.id === value.userId) {
                    p.Posts.push(value)
                }
                return p
            })
        },
        ChangePostContent(state, value: postType) {
            state.Users = state.Users.map(p => {
                if (p.id === value.userId) {
                    p.Posts = p.Posts.map(z => {
                        if (z.id === value.id) {
                            return {...z, body: value.body, title: value.title};
                        }
                        return z
                    })
                }
                return p
            })
        },
        DeleteCell(state, obj) {
            state.Users = state.Users.map(p => {
                if (p.id === obj.userId) {
                    p.Posts = p.Posts.filter(p => p.id !== obj.postId)

                }
                return p
            })
        },
    },
    actions: {
        //Подготовка пользователей
        async PrepareUsers({state, commit, dispatch}) {
            commit("loadState", true)
            const {isFetching, error, data} = await useFetch(`${process.env.VUE_APP_API}/users`)
            if (error.value) {
                commit("setError", true)
            } else {
                commit("loadUsers", JSON.parse(data.value as string) as userType[])

            }
            await dispatch("PrepareUsersPosts")

        },
        //Подготовка постов пользователя
        async PrepareUsersPosts({state, commit}) {

            const users = state.Users;
            const data = await Promise.all(users.map(async (user) => {
                const posts = await FetchUserPosts(user.id);
                return {...user, Posts: posts};
            }));
            commit("loadUsers", data)
            commit("loadState", false)
        },

    },
})
