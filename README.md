# book-moves &middot; ![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/JamesTeague/book-moves/Node%20CI) ![version](https://img.shields.io/github/package-json/v/JamesTeague/book-moves)
Chess openings trainer using courses to play moves forcing correct responses.

## Why?
There is a surprising lack of chess openings trainers that are simple. In my search, all I wanted was an application where
I could upload my training PGNs and have something make the moves of the opposite study color. I found I learn lines better
by playing them out rather than hitting the next button on Lichess and trying to see every variation. I started with 
[Lucas Chess](https://lucaschess.pythonanywhere.com) but this ties the user down to a computer that has an installation.
I wanted something that I could take with me. There is another application
that does this very well [Listudy](https://listudy.org). However, the progress you make is dependent on the browser used.
Meaning, I needed to use the same device all the time and not clear my cookies. I thought there was a better solution.
This is meant to be simple, and just an openings trainer. Eventually, it will grow to include more of a community oriented 
approach. I just want something to practice my lines on the computer or phone or tablet.

## Running the application locally

### Requirements
* pnpm


```bash
pnpm i
pnpm run dev

# Use link in console to reach webpage
```