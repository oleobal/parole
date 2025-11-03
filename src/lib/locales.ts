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
	reset : {
		en: "Reset",
		fr: "Reset"
	},
	
	multipleSpeakers : {
		en: "Multiple speakers can talk at once",
		fr: "Plusieurs personnes peuvent parler à la fois"
	},
	
	resetAllTimers : {
		en: "Reset all timers",
		fr: "Remettre tous les chronos à zéro"
	},
	resetAllTimersAreYouSure : {
		en: "Are you sure? All timers will be reset to zero.",
		fr: "Etes-vous certain·e ? Tous les chronos reviendront à zéro."
	},
	
	timersURL : {
		en: "The URL to this page, with all names and times recorded",
		fr: "L'adresse de cette page, avec tous les noms et les temps enregistrés"
	},
	
	keyboardShortcut : {
		en: "Keyboard shortcut",
		fr: "Raccourci clavier"
	},
	deleteTimer : {
		en: "Delete the timer",
		fr: "Supprimer le chrono"
	},
	startTimer: {
		en: "Start the timer",
		fr: "Démarrer le chrono"
	},
	stopTimer: {
		en: "Stop the timer",
		fr: "Arrêter le chrono"
	},
	addTimer: {
		en: "Add a timer",
		fr: "Ajouter un chrono"
	}
}

export const defaultTimers : {[key: string] : string[]}= {
	en: ["Men", "Women", "Gender minorities"],
	fr: ["Hommes", "Femmes", "Minorités de genre"]
}