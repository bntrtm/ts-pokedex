# Pokedex CLI

## Introduction

### About

This is a CLI tool imitating a "pokedex" using the [pokeapi.co](https://pokeapi.co) API.

It is a guided project by [boot.dev](https://boot.dev), made for their students to further practice writing HTTP clients in TypeScript.

You can [see my Go version here](https://github.com/bntrtm/pokedex-cli).

### Features

- page through a map of locations
- explore locations for pokemon
- throw pokeballs to catch pokemon
- list pokemon in your pokedex
- inspect pokemon within your pokedex
- in-memory cache

### Differences

As previously mentioned, this is the result of following a guided project.
But apart from style, there are some differences/additions of my own built on top of it. Namely, this project:

- introduces a function for interpolating instances of a string "formatting verb" (`%s`) within URL strings into substrings given via variadics.
- uses the aforementioned function to build consistent endpoint URLs in a hierarchical fashion.
  - This avoids needless repetition of endpoint construction, allowing endpoints to be defined in one single place.

## Installation

### Prerequisites

You will need `Node.js` v25.8.1 (or higher) installed.

You need [npm](https://github.com/npm) installed to manage dependencies and run the program (this should come with `Node.js`).

Clone the repo with `git`:

```bash
git clone https://github.com/bntrtm/ts-pokedex
cd ts-pokedex
```

Use `npm` to install `ts-pokedex` dependencies:

```bash
npm install
```

## Usage

### Production build

Build the program with `npm run build`, then run it with `npm start`.

You can then run `help` to see all available commands.

### Development mode

Use `npm run dev` for development use.

You can run the project's test suite with `npm test`.
