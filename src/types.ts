import type { MouseEvent } from 'react';

export interface StateData {
  dimensions: string;
  abbreviation: string;
  name: string;
}

export type StatesData = Record<string, StateData>;

export interface StateCustomization {
  fill?: string;
  clickHandler?: (stateAbbreviation: string) => void;
}

export type StatesCustomization = Record<string, StateCustomization>;

export interface USAMapProps {
  onClick?: (stateAbbreviation: string) => void;
  width?: number;
  height?: number;
  title?: string;
  defaultFill?: string;
  customize?: StatesCustomization;
}

export interface USAStateProps {
  stateName: string;
  dimensions: string;
  state: string;
  fill: string;
  onClickState: (event: MouseEvent<SVGPathElement>) => void;
}
