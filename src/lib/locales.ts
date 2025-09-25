export const choices = ["en", "fr"]

export const text : {[key: string] : {[key: string] : string}} = {
	speakingTime : {
		en: "Speaking time",
		fr: "Temps de parole"
	},
	multipleSpeakers : {
		en: "Multiple speakers can talk at once",
		fr: "Plusieurs personnes peuvent parler à la fois"
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