import { render, fireEvent } from '@testing-library/react';
import USAMap from '../index';
import data from '../data/usa-map-dimensions';

describe('Component: USAMap', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all states from usa-map-dimensions', () => {
    const { container } = render(<USAMap {...defaultProps} />);

    const statesData = data();
    const stateCount = Object.keys(statesData).length;

    // Each state gets a USAState component which renders a path.state
    const statePaths = container.querySelectorAll('path.state');
    expect(statePaths.length).toBe(stateCount);
  });

  it('should render with default props', () => {
    const { container } = render(<USAMap />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('us-state-map');

    const title = container.querySelector('svg > title');
    expect(title).toHaveTextContent('Blank US states map');
  });

  it('should render with custom title', () => {
    const { container } = render(<USAMap title="Custom Map Title" />);

    const title = container.querySelector('svg > title');
    expect(title).toHaveTextContent('Custom Map Title');
  });

  it('should render with custom dimensions', () => {
    const { container } = render(<USAMap width={500} height={300} />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '500');
    expect(svg).toHaveAttribute('height', '300');
  });

  it('should apply default fill color to states', () => {
    const { container } = render(<USAMap defaultFill="#FF0000" />);

    const statePath = container.querySelector('path.state');
    expect(statePath).toHaveAttribute('fill', '#FF0000');
  });

  it('should apply custom fill color to specific state', () => {
    const { container } = render(
      <USAMap
        customize={{
          AK: { fill: '#0000FF' },
        }}
      />
    );

    const alaskaPath = container.querySelector('path.AK');
    expect(alaskaPath).toHaveAttribute('fill', '#0000FF');
  });

  it('should call onClick when a state is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<USAMap onClick={onClick} />);

    const alaskaPath = container.querySelector('path.AK');
    expect(alaskaPath).toBeInTheDocument();
    fireEvent.click(alaskaPath!);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('AK');
  });

  it('should call custom click handler for specific state', () => {
    const onClick = jest.fn();
    const customClickHandler = jest.fn();

    const { container } = render(
      <USAMap
        onClick={onClick}
        customize={{
          NJ: { fill: 'navy', clickHandler: customClickHandler },
        }}
      />
    );

    const njPath = container.querySelector('path.NJ');
    expect(njPath).toBeInTheDocument();
    fireEvent.click(njPath!);

    expect(customClickHandler).toHaveBeenCalledTimes(1);
    expect(customClickHandler).toHaveBeenCalledWith('NJ');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onClick when DC circle is clicked', () => {
    const onClick = jest.fn();
    const { container } = render(<USAMap onClick={onClick} />);

    const dcCircle = container.querySelector('circle.DC2');
    expect(dcCircle).toBeInTheDocument();
    fireEvent.click(dcCircle!);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('DC');
  });

  it('should render with correct viewBox', () => {
    const { container } = render(<USAMap />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 959 593');
  });

  it('should have correct class names', () => {
    const { container } = render(<USAMap />);

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('us-state-map');

    const outlinesGroup = container.querySelector('g.outlines');
    expect(outlinesGroup).toBeInTheDocument();
  });
});
