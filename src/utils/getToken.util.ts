import Cookies from "js-cookie"

export const getToken = (key: string) => {
    return Cookies.get(key)
}