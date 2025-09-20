export class IDisplayManager
{
	updateDisplayLanguage() { throw new Error("Method 'updateDisplay()' is not implemented"); }
}

export class DisplayManager extends IDisplayManager
{
	async updateDisplayLanguage(languageManager, triggeredByUser = false)
	{
		try
		{
			const langCode = languageManager?.getCurrentLanguage?.() || document.documentElement.lang || "en";

			const response = await fetch(`data/languages/${langCode}.json`);
			if (!response.ok) { throw new Error(`Error! status: ${response.status}`); }
			const data = await response.json();

			if (data.messages?.languageChanged && triggeredByUser)
			{
				const messageDiv = document.getElementById("message-box");

				if (messageDiv)
				{
					messageDiv.textContent = data.messages.languageChanged;
					messageDiv.classList.add("visible");
					messageDiv.classList.remove("hidden");

					setTimeout
					(
						() =>
						{
							messageDiv.classList.add("hidden");
							messageDiv.classList.remove("visible");
						},
						3000
					);
				}
			}
			
			if (data.header?.title) { document.title = data.header.title; }

			const headerTitle = document.querySelector("header h1");
			if (headerTitle && data.header?.title) { headerTitle.textContent = data.header.title; }

			const toggleButton = document.getElementById("language-toggle");
			if (toggleButton && data.header?.button) { toggleButton.textContent = data.header.button; }

			const mainH2 = document.querySelector("main h2");
			if (mainH2 && data.main?.paragraph) { mainH2.textContent = data.main.paragraph; }

			const ul = document.querySelector(".lists ul");
			if (ul)
			{
				ul.innerHTML = "";
				const items = data.main?.list?.unordered ?? [];
				for (const itemText of items)
				{
					const li = document.createElement("li");
					li.textContent = itemText;
					ul.appendChild(li);
				}
			}

			const ol = document.querySelector(".lists ol");
			if (ol)
			{
				ol.innerHTML = "";
				const items = data.main?.list?.ordered ?? [];
				for (const itemText of items)
				{
					const li = document.createElement("li");
					li.textContent = itemText;
					ol.appendChild(li);
				}
			}

			const footerP = document.querySelector("footer p");
			if (footerP && data.footer?.copyright) { footerP.textContent = data.footer.copyright; }
		}
		catch (error) { console.error("Error fetching language file:", error); return; }
	}
}