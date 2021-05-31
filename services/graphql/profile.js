const userData = JSON.parse(localStorage.getItem('userData'))

if (!userData) {
  window.location.href = '/'
}

// change document title to username
document.title = `${userData.login} (${userData.name})`

// Format date function
const formatDate = (dateString) => {
  const options = { day: "numeric", month: "short" };
  return new Date(dateString).toLocaleDateString("en-NG", options);
};

// Format Counts function
const formatCounts = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

function loadHTML(userData) {
  const { avatarUrl, name, bio, repositories, status, login } = userData;

  // Full name display
  const fullnames = document.querySelectorAll(".fullname");
  fullnames.forEach((fullname) => {
    fullname.innerHTML = name;
  });

  // Nick name display
  const nicknames = document.querySelectorAll(".nickname");
  nicknames.forEach((nickname) => {
    nickname.innerHTML = login;
  });

  // Repository Count display
  const labels = document.querySelectorAll(".label");
  labels.forEach((label) => {
    label.innerHTML = repositories.nodes.length;
  });

  // Bio display
  const bioTexts = document.querySelectorAll(".bio");
  bioTexts.forEach((bioText) => {
    bioText.innerHTML = bio;
  });

  // Profile Pictures display
  const profilePictures = document.querySelectorAll(".profile__picture");
  profilePictures.forEach((profilePicture) => {
    profilePicture.style.display = "block";
    profilePicture.setAttribute("src", avatarUrl);
  });

  // User status display
  let statusID = document.querySelectorAll(".user-status");
  // statusID.forEach((userStatus) => {
  //   userStatus.innerHTML = status.emojiHTML;
  // });

  // Repository Loop
  const respositoryContainer = document.querySelector(".repository__con");

  repositories.nodes.forEach(async (repository) => {
    respositoryContainer.innerHTML += `<div class="repository">
    <div class="name__star display__flex">
      <div class="repo__name"> <a style='text-decoration: none;' href='https://github.com/${login}/${repository.name}'> ${repository.name}</a></div>
      <div class="star_con">
        <button class="display__flex">
          <svg
            class="octicon octicon-star mr-1"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path></svg
          >Star
        </button>
      </div>
    </div>
    <div class="repo-details display__flex">
      <div class="language__con">
        <div class="language__color" style="background-color: ${repository.languages && repository.languages.nodes.length != 0
        ? repository.languages.nodes[0].color
        : ""
      }"></div>
        <div class="language">${repository.languages && repository.languages.nodes.length != 0
        ? repository.languages.nodes[0].name
        : ''
      }</div>
      </div>
      <div class="star__count__con" style="${repository.languages && repository.languages.nodes.length != 0 ? 'display: visible' : 'display: none'}">
        <div>
          <svg
            class="octicon octicon-star mr-1"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
            ></path>
          </svg>
        </div>
        <div class="star__count">${repository.parent ? formatCounts(repository.parent.stargazerCount) : 0
      }</div>
      </div>
      <div class="network" style="${repository.languages && repository.languages.nodes.length != 0 ? 'display: visible' : 'display: none'}">
        <div>
          <svg
            aria-label="fork"
            class="octicon octicon-repo-forked"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            role="img"
          >
            <path
              fill-rule="evenodd"
              d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
            ></path>
          </svg>
        </div>
        <div class="network__count">${repository.parent ? formatCounts(repository.parent.forkCount) : 0
      }</div>
      </div>
      <div class="last__updated" style="${repository.languages && repository.languages.nodes.length != 0 ? '' : 'transform: translateX(-40%)'}">Updated on ${formatDate(
        repository.updatedAt
      )}</div>
    </div>
    </div>`;
  });
}

loadHTML(userData)

// Show & Hide Primary Profile At Secondary Navbar
const displayPrimaryProfile = (value) => {
  let primaryProfile = document.querySelector(".user");
  if (value) {
    primaryProfile.style.visibility = "visible";
    return false;
  }
  primaryProfile.style.visibility = "hidden";
};

window.addEventListener("scroll", function () {
  window.pageYOffset >= 300
    ? displayPrimaryProfile(true)
    : displayPrimaryProfile(false);
});
