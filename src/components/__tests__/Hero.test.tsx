import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Hero from '../ui/Hero';

const mockProps = {
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  cta: [
    { label: 'Button 1', url: '/test1' },
    { label: 'Button 2', url: '/test2' },
  ],
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Hero Component', () => {
  test('renders title and subtitle correctly', () => {
    renderWithRouter(<Hero {...mockProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  test('renders CTA buttons correctly', () => {
    renderWithRouter(<Hero {...mockProps} />);
    
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
    
    const button1 = screen.getByText('Button 1').closest('a');
    const button2 = screen.getByText('Button 2').closest('a');
    
    expect(button1).toHaveAttribute('href', '/test1');
    expect(button2).toHaveAttribute('href', '/test2');
  });
});
