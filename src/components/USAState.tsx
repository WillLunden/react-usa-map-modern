import type { USAStateProps } from '../types';

const USAState = ({ stateName, dimensions, state, fill, onClickState }: USAStateProps) => {
  return (
    <path
      d={dimensions}
      fill={fill}
      data-name={state}
      className={`${state} state`}
      onClick={onClickState}
    >
      <title>{stateName}</title>
    </path>
  );
};

export default USAState;
