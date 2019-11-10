window.onload = function() {
  var el = document.getElementById("logout-button");
  console.log(el);
  el.onclick = () => {
    fetch("/users/logout/", {
      headers: {
        Authentication: "token" // send jwt token here
      }
    });
  };
};
