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


export const generateRandomColor = (): string => {
    const characters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        color += characters[randomIndex];
    }

    return `background: linear-gradient(90deg,#4cf85a,${color})`
}
