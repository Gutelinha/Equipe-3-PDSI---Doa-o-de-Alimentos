import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ViewCampaignsPage from './ViewCampaignsPage';
import { getCampaign } from '../api/Campaign';

// Mock das dependências
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  getCampaign: jest.fn()
}));

// Mock do @headlessui/react
jest.mock('@headlessui/react', () => ({
  Tab: {
    Group: ({ children }) => <div>{children}</div>,
    List: ({ children }) => <div>{children}</div>,
    Panels: ({ children }) => <div>{children}</div>,
    Panel: ({ children }) => <div>{children}</div>,
    __esModule: true
  }
}));

// Mock dos componentes
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('ViewCampaignsPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('deve renderizar componentes iniciais', () => {
    render(<ViewCampaignsPage />);

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome da campanha...')).toBeInTheDocument();
    expect(screen.getByText('Mostrar Todas')).toBeInTheDocument();
  });

  test('deve mostrar mensagem inicial antes da busca', () => {
    render(<ViewCampaignsPage />);

    expect(screen.getByText('Use a busca ou clique em "Mostrar Todas" para visualizar as campanhas')).toBeInTheDocument();
  });

  test('deve mostrar loading durante a busca', async () => {
    getCampaign.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<ViewCampaignsPage />);
    fireEvent.click(screen.getByText('Mostrar Todas'));

    expect(screen.getByText('Carregando campanhas...')).toBeInTheDocument();
  });


  test('deve mostrar mensagem quando nenhuma campanha é encontrada', async () => {
    getCampaign.mockResolvedValue([]);

    render(<ViewCampaignsPage />);
    
    fireEvent.click(screen.getByText('Mostrar Todas'));
    
    await waitFor(() => {
      expect(screen.getByText('Nenhuma campanha encontrada')).toBeInTheDocument();
    });
  });
});