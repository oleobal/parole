export const choices = ["en", "fr"]

export const text : {[key: string] : {[key: string] : string}} = {
	speakingTime : {
		en: "Speaking time",
		fr: "Temps de parole"
	},
	settings : {
		en: "Settings",
		fr: "Réglages"
	},
	share: {
		en: "Share",
		fr: "Partager",
	},
	multipleSpeakers : {
		en: "Multiple speakers can talk at once",
		fr: "Plusieurs personnes peuvent parler à la fois"
	},
	language : {
		en: "Language",
		fr: "Langue"
	},
	close : {
		en: "Close",
		fr: "Fermer"
	},
	copy : {
		en: "Copy",
		fr: "Copier"
	},
	generate : {
		en: "Generate",
		fr: "Générer"
	},
	resetAllTimers : {
		en: "Reset all timers",
		fr: "Remettre tous les chronos à zéro"
	},
	resetAllTimersAreYouSure : {
		en: "Are you sure? All timers will be reset to zero.",
		fr: "Etes-vous certain·e ? Tous les chronos reviendront à zéro."
	},
	reset : {
		en: "Reset",
		fr: "Reset"
	},
	timersURL : {
		en: "The URL to this page, with all names and times recorded",
		fr: "L'adresse de cette page, avec tous les noms et les temps enregistrés"
	},
	deleteTimer : {
		en: "Delete the timer",
		fr: "Supprimer le chrono"
	}
}

export const defaultTimers : {[key: string] : string[]}= {
	en: ["Men", "Women", "Gender minorities"],
	fr: ["Hommes", "Femmes", "Minorités de genre"]
}