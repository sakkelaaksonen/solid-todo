# TodoDo - SolidJS & DaisyUI Excercise

https://sakkelaaksonen.github.io/solid-todo/

## Usage

```bash
$ npm install --legacy-peer-deps
# or pnpm install or yarn install
```

## Available Scripts

```bash
npm run dev
npm run preview
npm test
npm run build

```

### `npm run dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm test`

Runs vitest on watch mode.

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)

## Dev log

The goal of this excerise was to learn SolidJS and evaluate DaisyUI as a accessible pure css theming tool without JS components. DaisyUI also provides a well defined LLM instruction file.

As a whole, the stack was pleasant and reliable to use.
The nuances of signals and stores and contexts require further study. For this app, I chose store as it seemed most reliable to
use for render controlling and to test in the scope of the excersise.

## Things to improve

### Styles

While DaisyUI solves some of the Tailwind bloat, most of the components would benefit from having their own classes in organized in CSS layers where custom code and tailwind functions and utilities can be worked together to further optimize the network load and render times.

### Architecture

A typed error system and store operations wrapped in hooks would bring more scalablility and improve handling and testing. Common UI components could be componentized further. For this scale, I felt these were an overkill with no actual benefits beyond it's own sake.

### Testing

All components have satisfactory test coverage, considering the scope. More work might be done on corner case behaviour testing and mock data if the app becomes more complex.

### Accessibility

Accessiblity tree should be inspected and reworked with a narrative mindset to improve the microcopytext. The UI flow of the app is tested manually with mobile and desktop sized touch screens as well as mouse and keyboard, and evaluated with Lighthous.e Main focus has been on seamless UI scaling, keyboard navigation and required focus locks.

### Assistive technologies

Screen reading testing is cursory and various UI texts and related aria-labels are not yet been worked out as a whole.
Aria-live- behaviour is not implemented with any thought.
This would easily improve the sites usability with accessibility tools but is outside the scope of this excerise at the moment.
