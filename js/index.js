// Using the results of the search, display information about the users to the
// page. (You might include showing their username, avatar and a link to their
// profile.)

const form = document.querySelector("form#github-form")
form.addEventListener("submit", (event) => {
    event.preventDefault()
    getUsers(event.target[0].value)
    event.target[0].value = ""
})


function getUsers(username) {

    fetch(`https://api.github.com/search/users?q=${username}`)
    .then(response => response.json())
    .then(response => {
        response.items.forEach(user => showUser(user))

    })
}

function showUser(user) {
    const reposList = document.querySelector("#repos-list")
    reposList.textContent = ""


    const avatar = document.createElement("img")
    const li = document.createElement("li")

    const ul = document.querySelector('#user-list')

    avatar.src = user.avatar_url
    li.textContent = user.login
    avatar.addEventListener("click", () => showProfile(user.login))

    ul.append(avatar, li)

}

function showProfile(user) {
    // event.preventDefault()

    console.log(user)
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(response => {
        console.log("response", response)
        response.forEach(r => {
            const ul = document.querySelector("#repos-list")
            // ul.innerHTML += `<li>${r.name}</li>`
            const li = document.createElement("li")
            li.textContent = r.name
            ul.append(li)            
            const userList = document.querySelector('#user-list')
            userList.innerHTML = ""
        })
    })
}

// document.addEventListener("click", (event) => {
//     if(event.target.matches("img")) {
//         //do something
//     }
// }) 