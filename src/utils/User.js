export function getLoggedInUser() {
  return JSON.parse(localStorage.getItem("users"))[
    localStorage.getItem("isLoggedIn")
  ].username;
}