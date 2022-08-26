let url = "http://localhost:3000/posts";
let sectionForPosts = document.getElementsByClassName("posts")[0];

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      // 0. DIV FOR ONE POST
      let onePost = document.createElement("div");
      onePost.setAttribute("class", "onePost");
      sectionForPosts.appendChild(onePost);

      // 1. DIV FOR ICONS
      let spaceIcons = document.createElement("div");
      spaceIcons.setAttribute("class", "icons");
      onePost.appendChild(spaceIcons);

      // 2. BUTTONS ARROWS and SCORE VALUE
      // upVote
      let upVote = document.createElement("div");
      upVote.setAttribute("class", "upVote");
      spaceIcons.appendChild(upVote);

      // addEventListener
      upVote.addEventListener("click", (e) => {
        upVote.setAttribute("class", "upVoteRed");

        fetch(url + "/" + id + "/upvote", {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        window.location.href = "http://localhost:3000/";
      });

      // score
      let counter = document.createElement("span");
      counter.setAttribute("class", "score");
      spaceIcons.appendChild(counter);
      counter.textContent = data[i].score;

      // downVote
      let downVote = document.createElement("div");
      downVote.setAttribute("class", "downVote");
      spaceIcons.appendChild(downVote);

      // addEventListener
      downVote.addEventListener("click", (e) => {
        downVote.setAttribute("class", "downVoteBlue");

        fetch(url + "/" + id + "/downvote", {
          method: "PUT",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        window.location.href = "http://localhost:3000/";
      });

      // 3. TITLE
      let title = document.createElement("p");
      title.setAttribute("class", "title");
      onePost.appendChild(title);

      // 4. LINK
      let a = document.createElement("a");
      a.setAttribute("href", data[i].url);
      title.appendChild(a);
      a.textContent = data[i].title;

      // 5. TIME
      let date = document.createElement("span");
      let br = document.createElement("br");
      console.log(br);
      title.appendChild(br);
      date.setAttribute("class", "date");
      date.textContent = "submitted " + timeSince(data[i].timestamp) + " ago";
      title.appendChild(date);
      console.log(title);

      // 5. REMOVE BUTTON
      buttonRemove = document.createElement("button");
      onePost.appendChild(buttonRemove);
      buttonRemove.setAttribute("class", "buttRemove");
      buttonRemove.textContent = "Remove";

      // 6. ID OF THE POST (DELETE)
      let id = data[i].id;
      console.log(url + "/" + id);

      buttonRemove.addEventListener("click", (e) => {
        fetch(url + "/" + id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
        window.location.href = "http://localhost:3000/";
      });
    }
  });

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}
var aDay = 24 * 60 * 60 * 1000;

console.log(timeSince(new Date(Date.now() - aDay)));
console.log(timeSince(new Date(Date.now() - aDay * 2)));
