
/* =========================================
   SHAHEEN ESPORTS — FRONTEND INTERACTIONS
   Secure authentication will be connected
   through Supabase in the next setup step.
   ========================================= */

"use strict";

const authScreen = document.getElementById("auth-screen");
const gameScreen = document.getElementById("game-screen");

const authForm = document.getElementById("auth-form");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");

const usernameField = document.getElementById("username-field");
const confirmPasswordField = document.getElementById(
    "confirm-password-field"
);

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");

const authTitle = document.getElementById("auth-card-title");
const authDescription = document.getElementById("auth-card-description");
const submitLabel = document.getElementById("auth-submit-label");
const submitButton = document.getElementById("auth-submit");
const authMessage = document.getElementById("auth-message");

const logoutButton = document.getElementById("logout-button");
const currentYear = document.getElementById("current-year");

let authMode = "login";

/* Automatically update footer year */
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* Display a message in the authentication card */
function showAuthMessage(message, type = "") {
    authMessage.textContent = message;
    authMessage.className = "form-message";

    if (type) {
        authMessage.classList.add(type);
    }
}

/* Switch between login and registration forms */
function setAuthMode(mode) {
    authMode = mode === "register" ? "register" : "login";

    const isRegister = authMode === "register";

    loginTab.classList.toggle("active", !isRegister);
    registerTab.classList.toggle("active", isRegister);

    loginTab.setAttribute("aria-selected", String(!isRegister));
    registerTab.setAttribute("aria-selected", String(isRegister));

    usernameField.hidden = !isRegister;
    confirmPasswordField.hidden = !isRegister;

    usernameInput.required = isRegister;
    confirmPasswordInput.required = isRegister;

    passwordInput.autocomplete = isRegister
        ? "new-password"
        : "current-password";

    authTitle.textContent = isRegister
        ? "Create your account."
        : "Welcome back.";

    authDescription.textContent = isRegister
        ? "Create your player account to get started."
        : "Sign in to access your esports platform.";

    submitLabel.textContent = isRegister
        ? "CREATE ACCOUNT"
        : "SIGN IN";

    showAuthMessage("");
}

/* Tab buttons */
loginTab.addEventListener("click", () => {
    setAuthMode("login");
});

registerTab.addEventListener("click", () => {
    setAuthMode("register");
});

/*
  Authentication is intentionally not simulated here.
  Supabase will be connected before accounts are allowed
  to access the protected game hub.
*/
authForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    showAuthMessage("");

    if (!authForm.reportValidity()) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const username = usernameInput.value.trim();
    const confirmPassword = confirmPasswordInput.value;

    if (authMode === "register") {
        if (username.length < 3) {
            showAuthMessage(
                "Player name must contain at least 3 characters.",
                "error"
            );
            usernameInput.focus();
            return;
        }

        if (password.length < 8) {
            showAuthMessage(
                "Password must contain at least 8 characters.",
                "error"
            );
            passwordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            showAuthMessage(
                "Passwords do not match. Please try again.",
                "error"
            );
            confirmPasswordInput.focus();
            return;
        }
    }

    /*
      No fake success and no fake login:
      the real Supabase authentication connection
      will be implemented in the next step.
    */
    showAuthMessage(
        "Authentication setup is required. Connect Supabase in the next step before signing in.",
        "error"
    );
});

/* Only the available game can be selected after authentication */
document.querySelectorAll(".game-select-button").forEach((button) => {
    button.addEventListener("click", () => {
        if (button.dataset.game === "pubg-mobile") {
            showAuthMessage(
                "PUBG Mobile selected. Its tournament hub will be configured next."
            );
        }
    });
});

/* Sign out will be connected to Supabase authentication */
logoutButton.addEventListener("click", () => {
    gameScreen.hidden = true;
    authScreen.hidden = false;
    authForm.reset();
    setAuthMode("login");

    showAuthMessage(
        "Connect Supabase to enable secure account sessions."
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* Initial state: show authentication only */
authScreen.hidden = false;
gameScreen.hidden = true;
setAuthMode("login");
