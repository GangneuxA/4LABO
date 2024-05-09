export default function isAdmin() {
    const accessToken = localStorage.getItem("role");
    return accessToken === "admin";
}
  