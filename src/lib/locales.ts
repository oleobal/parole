import { appSettings } from "./state.svelte";
import { marked } from "marked";
import { trimMargin, capitalize } from "./util";

export const choices = ["en", "fr"];

export const text : {[key: string] : {[key: string] : string}} = {
	paroleLogo : {
		br: "gomz",
		ca: "parla",
		de: "sprache",
		en: "speech",
		eu: "hizkera", // basque
		eo: "parolado",
		fi: "puhe",
		fr: "parole",
		id: "tutur",
		ja: "げんぎょ",
		la: "dicendus",
		ru: "речь",
		uk: "слово",
		zh: "言語",
	},
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
	download: {
		en: "download",
		fr: "télécharger",
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
	
	name : {
		en: "name",
		fr: "nom",
	},
	percentage : {
		en: "percentage",
		fr: "pourcentage",
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
	enableAnimations: {
		en: "Enable visual animations",
		fr: "Activer les animations visuelles",
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
		## What is this app?
		
		This is a tool to measure how long different groups of people speak in a meeting.
		
		## Why
		
		Measuring speaking time allows uncovering some biases in social interactions. For instance, do men speak proportionally more than women?

		To avoid introducing biases in measurement, everything should be measured, including things like off the cuff remarks or interventions by the moderator : these themselves can introduce bias, and to exclude them from measurement could mask this.
		
		## How to use this app
		
		This app is intended to keep track of who (or what group of people) speak for how long in a meeting.
		
		It is a set of **timers**, with statistics compiled at the bottom.
		
		Timers can be added, removed and renamed as desired.
		
		On a computer, timers can be toggled with the appropriate keyboard keys (and \`Esc\` disables every timer)
		
		The app assumes only one person is speaking at once. This can be changed in the settings.
		
		The "share" button allows saving the timers & times, and sending them to others.
		
		## About this app
		
		All rights reserved, sorry.
		
		Development: https://github.com/oleobal/parole
		`),
		
		fr: trimMargin(`
		## Qu'est-ce que cette appli?
		
		C'est un outil pour mesurer le temps de parole de différents groupes de gens dans une réunion.
		
		## Pourquoi

		Mesurer le temps de parole permet de mettre en lumière certains biais dans les interactions sociales. Par exemple, les hommes parlent-ils proportionnellement davantage que les femmes ?

		Pour éviter d'introduire des biais dans la mesure, il vaut mieux tout chronométrer, y compris les remarques à la volée et l'animation : ces éléments peuvent eux-même introduire du biais, qui serait caché si on choisissait de les exclure.

		## Comment utiliser cette appli
		
		Vous avez à votre disposition plusieurs **chronomètres**, avec les totaux affichés en bas.
		
		Vous pouvez ajouter, supprimer ou renommer des chronos.
		
		Sur un ordinateur, les chronos peuvent être activés avec les touches du clavier (et la touche \`Esc\` désactive tous les chronos).
		
		L'appli part du principe qu'une seule personne parle à la fois. Cela peut être changé dans les réglages.
		
		Le bouton "Partager" permet de sauvegarder chronos et les temps, et de les partager à d'autres.

		## À propos de cette appli
		
		Tous droits réservés, désolé.

		Développement: https://github.com/oleobal/parole
		`)
	},
}

export function localize(key: string, doCapitalize:boolean = true, locale: string | null = null) : string {
	if (!locale) {
		locale = appSettings.locale
	}
	const str = text[key][String(locale)]
	return doCapitalize?capitalize(str):str;
}

export function localizedMarkdown(key: string) : string {
	return String(marked.parse(markdownText[key][appSettings.locale]));
}