# react-usa-map-modern

A simple, customizable SVG USA map component for React.

## Features

- All 50 US states plus DC, Alaska, and Hawaii
- Customizable colors per state
- Custom click handlers per state
- TypeScript support with full type definitions
- No D3 dependency - lightweight and fast
- Uses the [Albers projection](https://en.wikipedia.org/wiki/Albers_projection)

## Installation

Requires React 17, 18, or 19.

```bash
npm install react-usa-map-modern
```

## Usage

### Basic Example

```tsx
import USAMap from "react-usa-map-modern";

function App() {
  const handleClick = (stateAbbreviation: string) => {
    alert(`You clicked ${stateAbbreviation}`);
  };

  return <USAMap onClick={handleClick} />;
}
```

### With Customization

```tsx
import USAMap from "react-usa-map-modern";

function App() {
  const handleClick = (stateAbbreviation: string) => {
    console.log(`Clicked: ${stateAbbreviation}`);
  };

  const statesCustomization = {
    NJ: {
      fill: "navy",
      clickHandler: (state: string) => console.log(`Custom handler for ${state}`),
    },
    NY: {
      fill: "#CC0000",
    },
  };

  return (
    <USAMap
      customize={statesCustomization}
      onClick={handleClick}
      defaultFill="#E8E8E8"
    />
  );
}
```

### Styling Hover States

```css
path.state {
  pointer-events: all;
}
path.state:hover {
  opacity: 0.5;
  cursor: pointer;
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClick` | `(stateAbbreviation: string) => void` | - | Called when a state is clicked |
| `width` | `number` | `959` | SVG width |
| `height` | `number` | `593` | SVG height |
| `title` | `string` | `"Blank US states map"` | SVG title attribute |
| `defaultFill` | `string` | `"#D3D3D3"` | Default fill color for states |
| `customize` | `StatesCustomization` | `{}` | Per-state customization (see below) |

### Customization Object

```ts
type StatesCustomization = {
  [stateAbbreviation: string]: {
    fill?: string;
    clickHandler?: (stateAbbreviation: string) => void;
  };
};
```

## TypeScript

Type definitions are included. You can import types directly:

```ts
import USAMap, { USAMapProps, StatesCustomization } from "react-usa-map";
```

## HTML Structure

Each state is rendered as an SVG path with the state abbreviation as a class:

```html
<path class="CA state" data-name="CA" fill="#D3D3D3" d="..."></path>
```

## License

[MIT](LICENSE.md)

## Sources

The map is sourced from [Wikimedia](https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg) under [CC BY-SA 3.0](https://spdx.org/licenses/CC-BY-SA-3.0.html).
