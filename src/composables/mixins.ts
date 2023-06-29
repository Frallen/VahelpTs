import {useFetch} from "@vueuse/core";

export const FetchUserPosts = async (userId: number): Promise<postType> => {
    try {
        const {data} = await useFetch(`${process.env.VUE_APP_API}/users/${userId}/posts?_start=0&_limit=5`);

        return JSON.parse(data.value as string);
    } catch (error) {
        throw new Error('Failed to fetch user posts');
    }
}
export const overFlow = (state: boolean): void => {

    if (state) {
        document.body.style.overflowY = "hidden";
    } else document.body.style.overflowY = "visible";

};