import { appSettings } from "./state.svelte";
import { marked } from "marked";
import { trimMargin } from "./util";

export const choices = ["en", "fr"];

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
	help: {
		en: "Help",
		fr: "Aide"
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

export const markdownText : {[key: string] : {[key: string] : string}} = {
	helpText : {
		en: trimMargin(`
		This app is intended to keep track of who (or what group of people) speak for how long in a meeting.
		
		It is a set of **timers**, with statistics compiled at the bottom.
		
		Timers can be added, removed and renamed as desired.
		
		On a computer, timers can be toggled with the appropriate keyboard keys (and \`Esc\` disables every timer)`),
		
		fr: trimMargin(`
		Cette appli sert à mesurer le temps de parole de gens (ou groupes de gens) dans une assemblée.
		
		Vous avez à votre disposition plusieurs **chronomètres**, avec les totaux affichés en bas.
		
		Vous pouvez ajouter, supprimer ou renommer des chronos.
		
		Sur un ordinateur, les chronos peuvent être activés avec les touches du clavier (et la touche \`Esc\` désactive tous les chronos).`)
	},
}

export const defaultTimers : {[key: string] : string[]}= {
	en: ["Men", "Women", "Gender minorities"],
	fr: ["Hommes", "Femmes", "Minorités de genre"]
}


export function localized(key: string) : string {
	return text[key][appSettings.locale];
}

export function localizedMarkdown(key: string) : string {
	return String(marked.parse(markdownText[key][appSettings.locale]));
}