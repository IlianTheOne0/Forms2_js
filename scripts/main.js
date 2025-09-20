import { ILanguageManager, LanguageManager } from "./managers/languageManager.js";
import { IDisplayManager, DisplayManager } from "./managers/displayManager.js";

import { initializeLanguageToggle } from "./buttons/language-toggle.js";

const languageManager = new LanguageManager();
languageManager.prototype = ILanguageManager.prototype;
languageManager.initializeLanguage();

const displayManager = new DisplayManager();
displayManager.prototype = IDisplayManager.prototype;
displayManager.updateDisplayLanguage(languageManager);

initializeLanguageToggle(languageManager, displayManager);