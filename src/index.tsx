import { useCallback, useMemo } from 'react';
import data from './data/usa-map-dimensions';
import USAState from './components/USAState';
import type { USAMapProps, StatesData } from './types';

const DEFAULT_FILL = '#D3D3D3';
const DEFAULT_WIDTH = 959;
const DEFAULT_HEIGHT = 593;
const DEFAULT_TITLE = 'Blank US states map';

const USAMap = ({
  onClick,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  title = DEFAULT_TITLE,
  defaultFill = DEFAULT_FILL,
  customize = {},
}: USAMapProps) => {
  const statesData: StatesData = useMemo(() => data(), []);

  const fillStateColor = useCallback(
    (state: string): string => {
      return customize[state]?.fill ?? defaultFill;
    },
    [customize, defaultFill]
  );

  const handleClick = useCallback(
    (stateAbbreviation: string) => {
      onClick?.(stateAbbreviation);
    },
    [onClick]
  );

  const getStateClickHandler = useCallback(
    (state: string) => {
      const customHandler = customize[state]?.clickHandler;
      if (customHandler) {
        return () => customHandler(state);
      }
      return () => handleClick(state);
    },
    [customize, handleClick]
  );

  const paths = useMemo(() => {
    return Object.keys(statesData)
      .filter((stateKey) => Object.prototype.hasOwnProperty.call(statesData, stateKey))
      .map((stateKey) => (
        <USAState
          key={stateKey}
          stateName={statesData[stateKey].name}
          dimensions={statesData[stateKey].dimensions}
          state={stateKey}
          fill={fillStateColor(stateKey)}
          onClickState={getStateClickHandler(stateKey)}
        />
      ));
  }, [statesData, fillStateColor, getStateClickHandler]);

  return (
    <svg
      className="us-state-map"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 959 593"
    >
      <title>{title}</title>
      <g className="outlines">
        {paths}
        <g className="DC state">
          <path
            className="DC1"
            fill={fillStateColor('DC1')}
            d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z"
          />
          <circle
            className="DC2"
            onClick={() => handleClick('DC')}
            data-name="DC"
            fill={fillStateColor('DC2')}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            cx="801.3"
            cy="251.8"
            r="5"
            opacity="1"
          />
        </g>
      </g>
    </svg>
  );
};

export default USAMap;
export type { USAMapProps, StateCustomization, StatesCustomization, StateData, StatesData } from './types';
