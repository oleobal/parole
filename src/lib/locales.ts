import { appSettings } from "./state.svelte";
import { marked } from "marked";
import { trimMargin } from "./util";

export const choices = ["en", "fr"];

export const text : {[key: string] : {[key: string] : string}} = {
	speakingTime : {
		en: "speaking time",
		fr: "temps de parole"
	},
	settings : {
		en: "settings",
		fr: "réglages"
	},
	share: {
		en: "share",
		fr: "partager",
	},
	help: {
		en: "help",
		fr: "aide"
	},
	language : {
		en: "language",
		fr: "langue"
	},
	close : {
		en: "close",
		fr: "fermer"
	},
	copy : {
		en: "copy",
		fr: "copier"
	},
	generate : {
		en: "generate",
		fr: "générer"
	},
	reset : {
		en: "reset",
		fr: "reset"
	},
	
	multipleSpeakers : {
		en: "multiple speakers can talk at once",
		fr: "plusieurs personnes peuvent parler à la fois"
	},
	resetAllTimers : {
		en: "reset all timers",
		fr: "remettre tous les chronos à zéro"
	},
	resetAllTimersAreYouSure : {
		en: "Are you sure? All timers will be reset to zero.",
		fr: "Etes-vous certain·e ? Tous les chronos reviendront à zéro."
	},
	
	timersURL : {
		en: "the URL to this page, with all names and times recorded",
		fr: "l'adresse de cette page, avec tous les noms et les temps enregistrés"
	},
	
	keyboardShortcut : {
		en: "keyboard shortcut",
		fr: "raccourci clavier"
	},
	deleteTimer : {
		en: "delete the timer",
		fr: "supprimer le chrono"
	},
	startTimer: {
		en: "start the timer",
		fr: "démarrer le chrono"
	},
	stopTimer: {
		en: "stop the timer",
		fr: "arrêter le chrono"
	},
	addTimer: {
		en: "add a timer",
		fr: "ajouter un chrono"
	},
	men: {
		en: "men",
		fr: "hommes"
	},
	women: {
		en: "women",
		fr: "femmes"
	},
	genderMinorities: {
		en: "gender minorities",
		fr: "minorités de genre"
	},
	participant: {
		en: "participant",
		fr: "participant"
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

export function localize(key: string, capitalize:boolean = true, locale: string | null = null) : string {
	if (!locale) {
		locale = appSettings.locale
	}
	const str = text[key][appSettings.locale]
	return capitalize?str.charAt(0).toUpperCase() + str.slice(1):str;
}

export function localizedMarkdown(key: string) : string {
	return String(marked.parse(markdownText[key][appSettings.locale]));
}