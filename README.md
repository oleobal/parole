# Speaking time chronometer

A web app for keeping track of who spoke for how long in an group.

See it running at https://oleobal.github.io/parole/

# Features

- use any number of chronometers to keep track of classes of people or individual persons
- results are compiled in real time
- localized (english and french)
- fully responsive with desktop and mobile UI
- keyboard controls
- save the current status as a shareable URL

# Development

It is a Svelte app.

To run it:

`yarn install`

`yarn dev`

## manipulating internal state

Export the internal state with the top right "Share" button, which gives one an URL with a base64 string encoding a JSON of the internal state. It can be modified, reencoded, and then loaded into the app.
