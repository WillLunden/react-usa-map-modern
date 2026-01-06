import { render, fireEvent } from '@testing-library/react';
import USAState from '../components/USAState';

describe('Component: USAState', () => {
  const defaultProps = {
    dimensions:
      'M161.1,453.7 l-0.3,85.4 1.6,1 3.1,0.2 1.5,-1.1 h2.6 l0.2,2.9',
    state: 'AK',
    stateName: 'Alaska',
    fill: '#D3D3D3',
    onClickState: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render with correct attributes', () => {
    const { container } = render(
      <svg>
        <USAState {...defaultProps} />
      </svg>
    );

    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', defaultProps.dimensions);
    expect(path).toHaveAttribute('fill', defaultProps.fill);
    expect(path).toHaveAttribute('data-name', defaultProps.state);
    expect(path).toHaveClass('AK', 'state');
  });

  it('should render state name as title element', () => {
    const { container } = render(
      <svg>
        <USAState {...defaultProps} />
      </svg>
    );

    const title = container.querySelector('title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Alaska');
  });

  it('should call onClickState when clicked', () => {
    const onClickState = jest.fn();
    const { container } = render(
      <svg>
        <USAState {...defaultProps} onClickState={onClickState} />
      </svg>
    );

    const path = container.querySelector('path');
    expect(path).toBeInTheDocument();
    fireEvent.click(path!);

    expect(onClickState).toHaveBeenCalledTimes(1);
  });

  it('should render with custom fill color', () => {
    const { container } = render(
      <svg>
        <USAState {...defaultProps} fill="#FF0000" />
      </svg>
    );

    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill', '#FF0000');
  });
});
