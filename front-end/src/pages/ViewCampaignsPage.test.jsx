import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import ViewCampaignsPage from './ViewCampaignsPage';
import { getCampaign } from '../api/Campaign';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  getCampaign: jest.fn()
}));

jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('ViewCampaignsPage', () => {
  const mockNavigate = jest.fn();
  const mockCampaign = {
    name: 'Campanha Teste',
    start_date: '2024-01-01',
    end_date: '2024-12-31'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    window.alert = jest.fn();
  });

  test('renderiza componentes corretamente', () => {
    render(<ViewCampaignsPage />);
    
    expect(screen.getByText('Visualizar Campanhas')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite o nome da campanha...')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
    expect(screen.getByText('Mostrar Todas')).toBeInTheDocument();
  });

  test('botão voltar navega para página inicial', () => {
    render(<ViewCampaignsPage />);
    
    fireEvent.click(screen.getByText('Voltar'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('busca campanha específica', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    render(<ViewCampaignsPage />);
    
    fireEvent.change(screen.getByPlaceholderText('Digite o nome da campanha...'), {
      target: { value: 'Campanha Teste' }
    });
    
    fireEvent.click(screen.getByText('Buscar'));
    
    await waitFor(() => {
      expect(screen.getByText('Campanha Teste')).toBeInTheDocument();
      // Usando regex para ser mais flexível com o formato da data
      expect(screen.getByText(/Data de Início:/)).toBeInTheDocument();
      expect(screen.getByText(/Data de Fim:/)).toBeInTheDocument();
    });
  });

  test('mostra todas as campanhas', async () => {
    const mockCampaigns = [mockCampaign, {...mockCampaign, name: 'Campanha 2'}];
    getCampaign.mockResolvedValueOnce(mockCampaigns);
    
    render(<ViewCampaignsPage />);
    fireEvent.click(screen.getByText('Mostrar Todas'));
    
    await waitFor(() => {
      expect(screen.getByText('Campanha Teste')).toBeInTheDocument();
      expect(screen.getByText('Campanha 2')).toBeInTheDocument();
    });
  });

  test('gera relatório para campanha', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    render(<ViewCampaignsPage />);
    
    fireEvent.change(screen.getByPlaceholderText('Digite o nome da campanha...'), {
      target: { value: 'Campanha Teste' }
    });
    
    fireEvent.click(screen.getByText('Buscar'));
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Gerar Relatório'));
      expect(window.alert).toHaveBeenCalledWith('Relatório gerado para campanha: Campanha Teste');
    });
  });

  test('exibe mensagem quando nenhuma campanha é encontrada', async () => {
    getCampaign.mockResolvedValueOnce([]);
    render(<ViewCampaignsPage />);
    
    fireEvent.click(screen.getByText('Mostrar Todas'));
    
    await waitFor(() => {
      expect(screen.getByText('Nenhuma campanha encontrada')).toBeInTheDocument();
    });
  });

  test('exibe loading durante a busca', async () => {
    getCampaign.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<ViewCampaignsPage />);
    
    fireEvent.click(screen.getByText('Mostrar Todas'));
    
    expect(screen.getByText('Carregando campanhas...')).toBeInTheDocument();
  });
});
