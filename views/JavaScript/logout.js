const logout = () => {
  localStorage.removeItem("logged");
  localStorage.removeItem("questions");
  window.location.href = "login.html";
};
