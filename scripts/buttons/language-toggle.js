export function initializeLanguageToggle(languageManager, displayManager)
{
	const toggleButton = document.getElementById("language-toggle");
	if (!toggleButton) { console.warn("Language toggle button not found!"); return; }

	toggleButton.addEventListener
	(
		"click",
		() =>
		{
			const currentLang = languageManager.getCurrentLanguage();
			const newLang = currentLang === "en" ? "ua" : "en";
			languageManager.setLanguage(newLang);
			displayManager.updateDisplayLanguage(languageManager);
		}
	);
}