let body = document.queryCommandIndeterm("body");
let url = "http://localhost:3000/posts";
let formArticle = document.getElementsByTagName("form")[0];
note = document.createElement("p");
formArticle.appendChild(note);

formArticle.addEventListener("submit", (e) => {
  e.preventDefault();
  note.textContent = "";
  let titleInput = e.target.elements[0].value;
  let urlInput = e.target.elements[1].value;

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: titleInput,
      url: urlInput,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        note.textContent = data.error;
        note.setAttribute("class", "red");
      } else {
        console.log(data);
        console.log("title:", data.title);
        console.log("url", data.url);
        window.location.replace("http://localhost:3000/");
      }
    });
});
