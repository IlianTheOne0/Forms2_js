export class ILanguageManager
{
	initializeLanguage() { throw new Error("Method 'initializeLanguage()' is not implemented"); }
	getCurrentLanguage() { throw new Error("Method 'getCurrentLanguage()' is not implemented"); }
	setLanguage(lang) { throw new Error("Method 'setLanguage()' is not implemented"); }
}

export class LanguageManager extends ILanguageManager
{
	initializeLanguage()
	{
		const savedLang = localStorage.getItem("language");
		if (savedLang) { document.documentElement.lang = savedLang; }
	}
	getCurrentLanguage() { return document.documentElement.lang; }
	setLanguage(lang) { document.documentElement.lang = lang; localStorage.setItem("language", lang); }
}