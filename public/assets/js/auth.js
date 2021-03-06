const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const sign_up_form = document.querySelector('#sign-up-form');
const sign_in_form = document.querySelector('#sign-in-form');
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    document.title = "Create a new Hyve account"
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
    document.title = "Sign into your Hyve account"
});

sign_in_form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = sign_in_form.email.value
    const password = sign_in_form.password.value
    const data = { email, password }  

    try {
        const res = await fetch('/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type' : 'application/json' }
        })

        const response = await res.json()
        console.log(response)
        
        if (response.errors) {
            if (response.errors.username) { toast(response.errors.username, true, "warn") }
            if (response.errors.email) { toast(response.errors.email, true, "incorrect") }
            if (response.errors.password) { toast(response.errors.password, true, "incorrect") }
        }
        if (response.user) {
            toast("You have been logged into your account!", true, "success")
            setTimeout(function(){window.location.replace('/')}, 1500)
        }
    } catch (err) {
        console.log(err)
    }
    console.log(data)
})

sign_up_form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const username = sign_up_form.username.value
    const email = sign_up_form.email.value
    const password = sign_up_form.password.value
    const invite = parseInt(sign_up_form.invite.value)
    const data = { username, email, password, invite }  
    console.log(data)

    try {
        const res = await fetch('/signup', {
            method: "POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type' : 'application/json' }
        })

        const response = await res.json()
        console.log(response)
        
        if (response.errors) {
            if (response.errors.username) { toast(response.errors.username, true, "warn") }
            if (response.errors.email) { toast(response.errors.email, true, "warn") }
            if (response.errors.password) { toast(response.errors.password, true, "warn") }
        }
        if (response.user) {
            toast("Your account has been created", true, "success")
            setTimeout(function(){window.location.replace('/')}, 1500)
        }
    } catch (err) {
        console.log(err)
    }
})