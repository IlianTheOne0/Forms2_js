const form = document.getElementById("registration-form");
const clearBtn = document.getElementById("clear-button");
const rememberCheckbox = document.getElementById("remember-me");

form.addEventListener
(
	"submit",
	(event) =>
	{
		event.preventDefault();

		const formData = new FormData(form);

		const username = (formData.get("username") || "").toString().trim();
		const email = (formData.get("email") || "").toString().trim();
		const password = (formData.get("password") || "").toString();
		const confirmPassword = (formData.get("confirm-password") || "").toString();

		if (!username) { alert("Username is required!"); return; }
		if (!email || !/\S+@\S+\.\S+/.test(email)) { alert("Valid email is required!"); return; }
		if (password.length < 8) { alert("Password must be at least 8 characters long!"); return; }
		if (password !== confirmPassword) { alert("Passwords do not match!"); document.getElementById("password").value = ""; document.getElementById("confirm-password").value = ""; return; }

		if (rememberCheckbox && rememberCheckbox.checked)
		{
			const cookieValue = encodeURIComponent(username);
			const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toUTCString();
			document.cookie = `username=${cookieValue}; expires=${expires};`;
		}
		
		history.replaceState(null, "", window.location.pathname);
		alert(`Hello, ${username}! You have been registered successfully`);
		form.reset();
	}
);

if (clearBtn)
{
	clearBtn.addEventListener
	(
		"click",
		() =>
		{
			const cookies = document.cookie.split(";").map(c => c.trim()).filter(Boolean);

			for (const cookie of cookies)
			{
				const eqPos = cookie.indexOf("=");
				const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;

				document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
				document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
			}

			localStorage.clear();
			sessionStorage.clear();
			
			form.reset();
		}
	);
}

const cookies = document.cookie.split(";").map(cookie => cookie.trim()).filter(Boolean);
for (const cookie of cookies)
{
	const eqPos = cookie.indexOf("=");
	const name = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;

	if (name === "username")
	{
		const value = eqPos > -1 ? cookie.slice(eqPos + 1) : "";
		const usernameInput = document.getElementById("username");
		if (usernameInput) { usernameInput.value = decodeURIComponent(value); }
		break;
	}
}

form.addEventListener
(
	"reset",
	() =>
	{
		const inputs = form.querySelectorAll("input");
		inputs.forEach
		(
			input =>
			{
				input.style.transition = "opacity 0.5s ease";
				input.style.opacity = "0";
				setTimeout(() => { input.style.opacity = "1"; }, 500);
			}
		);
	}
);