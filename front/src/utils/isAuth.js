export default function isAuth() {
    const accessToken = localStorage.getItem("accessToken");
    return accessToken !== null;
}
