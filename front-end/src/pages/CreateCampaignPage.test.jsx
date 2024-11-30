import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import CreateCampaignPage from './CreateCampaignPage';
import { createCampaign } from '../api/Campaign';

// Mock das dependências
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  createCampaign: jest.fn()
}));

// Mock dos componentes Header e Footer
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('CreateCampaignPage', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    // Mock do window.alert
    window.alert = jest.fn();
  });

  test('renderiza todos os componentes corretamente', () => {
    render(<CreateCampaignPage />);
    
    expect(screen.getByText('Criar Nova Campanha')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Início')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de Fim')).toBeInTheDocument();
    expect(screen.getByText('Salvar Campanha')).toBeInTheDocument();
  });

  test('botão voltar navega para página inicial', () => {
    render(<CreateCampaignPage />);
    
    const backButton = screen.getByText('Voltar');
    fireEvent.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('submete formulário com dados corretos', async () => {
    createCampaign.mockResolvedValueOnce({ success: true });
    
    render(<CreateCampaignPage />);
    
    // Preenche o formulário
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Campanha Teste' }
    });
    
    fireEvent.change(screen.getByLabelText('Data de Início'), {
      target: { value: '2024-01-01' }
    });
    
    fireEvent.change(screen.getByLabelText('Data de Fim'), {
      target: { value: '2024-12-31' }
    });
    
    // Submete o formulário
    fireEvent.click(screen.getByText('Salvar Campanha'));
    
    await waitFor(() => {
      expect(createCampaign).toHaveBeenCalledWith({
        name: 'Campanha Teste',
        start_date: '01/01/2024',
        end_date: '31/12/2024'
      });
      expect(window.alert).toHaveBeenCalledWith('Campanha criada com sucesso!');
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test('submete formulário sem data de fim', async () => {
    createCampaign.mockResolvedValueOnce({ success: true });
    
    render(<CreateCampaignPage />);
    
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Campanha Teste' }
    });
    
    fireEvent.change(screen.getByLabelText('Data de Início'), {
      target: { value: '2024-01-01' }
    });
    
    fireEvent.click(screen.getByText('Salvar Campanha'));
    
    await waitFor(() => {
      expect(createCampaign).toHaveBeenCalledWith({
        name: 'Campanha Teste',
        start_date: '01/01/2024'
      });
    });
  });

  test('trata erro na criação da campanha', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    createCampaign.mockRejectedValueOnce(new Error('Erro ao criar campanha'));
    
    render(<CreateCampaignPage />);
    
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Campanha Teste' }
    });
    
    fireEvent.change(screen.getByLabelText('Data de Início'), {
      target: { value: '2024-01-01' }
    });
    
    fireEvent.click(screen.getByText('Salvar Campanha'));
    
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao criar campanha:', expect.any(Error));
    });
    
    consoleErrorSpy.mockRestore();
  });
});
