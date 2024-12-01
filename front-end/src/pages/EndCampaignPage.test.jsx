import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import EndCampaignPage from './EndCampaignPage';
import { getCampaign, deleteCampaign } from '../api/Campaign';
import { act } from 'react-dom/test-utils';

// Mock das dependências
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  getCampaign: jest.fn(),
  deleteCampaign: jest.fn()
}));

// Mock dos componentes Header e Footer
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('EndCampaignPage', () => {
  const mockNavigate = jest.fn();
  const mockCampaign = {
    name: 'Campanha Teste',
    start_date: '12/25/2024'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    useParams.mockReturnValue({ name: 'Campanha Teste' });
    window.alert = jest.fn();
    window.confirm = jest.fn();
  });

 

  test('carrega e exibe dados da campanha', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Campanha Teste')).toBeInTheDocument();
    });
  });

  test('valida data de encerramento anterior à data de início', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    window.confirm.mockReturnValueOnce(true);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Encerramento')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Data de Encerramento'), {
        target: { value: '2024-12-24' }
      });
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Confirmar Encerramento'));
    });
    
    expect(window.alert).toHaveBeenCalledWith(
      'A data de encerramento deve ser pelo menos um dia após a data de início'
    );
  });

  test('encerra campanha com sucesso', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    deleteCampaign.mockResolvedValueOnce({ success: true });
    window.confirm.mockReturnValueOnce(true);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Encerramento')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Data de Encerramento'), {
        target: { value: '2024-12-26' }
      });
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Confirmar Encerramento'));
    });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Campanha encerrada com sucesso!');
      expect(mockNavigate).toHaveBeenCalledWith('/visualizar-campanhas');
    });
  });

  test('trata erro ao encerrar campanha', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    deleteCampaign.mockRejectedValueOnce(new Error('Erro ao encerrar'));
    window.confirm.mockReturnValueOnce(true);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Encerramento')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Data de Encerramento'), {
        target: { value: '2024-12-26' }
      });
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Confirmar Encerramento'));
    });
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erro ao encerrar campanha');
    });
  });

  test('navega de volta ao clicar em voltar', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Voltar'));
    });
    
    expect(mockNavigate).toHaveBeenCalledWith('/visualizar-campanhas');
  });

  test('cancela encerramento quando usuário não confirma', async () => {
    getCampaign.mockResolvedValueOnce(mockCampaign);
    window.confirm.mockReturnValueOnce(false);
    
    await act(async () => {
      render(<EndCampaignPage />);
    });
    
    await waitFor(() => {
      expect(screen.getByLabelText('Data de Encerramento')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText('Data de Encerramento'), {
        target: { value: '2024-12-26' }
      });
    });
    
    await act(async () => {
      fireEvent.click(screen.getByText('Confirmar Encerramento'));
    });
    
    expect(deleteCampaign).not.toHaveBeenCalled();
  });
});
