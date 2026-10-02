// =====================================================
// LANGUAGE SYSTEM
// =====================================================

const savedLanguage =
    localStorage.getItem("rafitasLanguage") || "en";

let currentLanguage =
    savedLanguage;


// =====================================================
// APPLY TRANSLATIONS
// =====================================================

function applyTranslations() {

    const elements =
        document.querySelectorAll("[data-i18n]");

    elements.forEach(element => {

        const key =
            element.dataset.i18n;

        const value =
            getTranslation(key);

        if (value) {
            element.textContent = value;
        }

    });

}


// =====================================================
// GET TRANSLATION
// =====================================================

function getTranslation(key) {

    const keys =
        key.split(".");

    let value =
        translations[currentLanguage];

    keys.forEach(part => {

        if (value) {
            value = value[part];
        }

    });

    return value || "";
}


// =====================================================
// SET LANGUAGE
// =====================================================

function setLanguage(language) {

    if (!translations[language]) {
        return;
    }

    currentLanguage =
        language;

    localStorage.setItem(
        "rafitasLanguage",
        language
    );

    applyTranslations();
    updateLanguageButtons();

    document.dispatchEvent(
        new CustomEvent("languageChanged")
    );

}


// =====================================================
// LANGUAGE BUTTONS
// =====================================================

function updateLanguageButtons() {

    const buttons =
        document.querySelectorAll(
            ".language-button"
        );

    buttons.forEach(button => {

        const language =
            button.dataset.language;

        const isActive =
            language === currentLanguage;

        button.classList.toggle(
            "active",
            isActive
        );

    });

}


// =====================================================
// INITIALIZE
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const buttons =
            document.querySelectorAll(
                ".language-button"
            );

        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    setLanguage(
                        button.dataset.language
                    );

                }
            );

        });

        applyTranslations();
        updateLanguageButtons();

    }
);