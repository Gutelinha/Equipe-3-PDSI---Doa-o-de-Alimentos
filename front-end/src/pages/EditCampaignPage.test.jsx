import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import EditCampaignPage from './EditCampaignPage';
import { getCampaign, updateCampaign } from '../api/Campaign';
import { act } from 'react-dom/test-utils';

// Mock das dependências
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  getCampaign: jest.fn(),
  updateCampaign: jest.fn()
}));

// Mock dos componentes Header e Footer
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('EditCampaignPage', () => {
  const mockNavigate = jest.fn();
  const mockCampaign = {
    name: 'Campanha Teste',
    start_date: '12/25/2024',
    end_date: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ name: 'Campanha Teste' });
    window.alert = jest.fn();
  });

  test('carrega e exibe dados da campanha', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    
    await act(async () => {
      render(<EditCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Campanha Teste')).toBeInTheDocument();
    });
  });

  test('atualiza campanha com sucesso', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    updateCampaign.mockResolvedValueOnce({ success: true });
    
    await act(async () => {
      render(<EditCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Início')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Data de Início'), {
        target: { value: '2024-12-26' }
      });
    });
    
    await act(async () => {
      fireEvent.submit(screen.getByText('Atualizar Campanha').closest('form'));
    });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Campanha atualizada com sucesso!');
      expect(mockNavigate).toHaveBeenCalledWith('/visualizar-campanhas');
    });
  });

  test('trata erro ao atualizar campanha', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    updateCampaign.mockRejectedValueOnce(new Error('Erro ao atualizar'));
    
    await act(async () => {
      render(<EditCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Início')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.submit(screen.getByText('Atualizar Campanha').closest('form'));
    });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro ao atualizar campanha');
    });
  });

  test('navega de volta ao clicar em voltar', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    
    await act(async () => {
      render(<EditCampaignPage />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Voltar'));
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('/visualizar-campanhas');
  });
});
