import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import RegisterDonatePage from './RegisterDonatePage';
import { getCampaign } from '../api/Campaign';
import { createDonation } from '../api/Donation';
import { getProduct } from '../api/Product';
import { act } from 'react-dom/test-utils';
import { any } from 'prop-types';

// Mock das dependências
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('../api/Campaign', () => ({
  getCampaign: jest.fn()
}));

jest.mock('../api/Donation', () => ({
  createDonation: jest.fn()
}));

jest.mock('../api/Product', () => ({
  getProduct: jest.fn()
}));

// Mock dos componentes Header e Footer
jest.mock('../components/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('RegisterDonatePage', () => {
  const mockNavigate = jest.fn();
  const mockCampaign = { name: 'Campanha Teste' };
  const mockProduct = {
    barcode: '7893500020110',
    name: 'Arroz',
    brand: 'Tio João',
    type: 'Alimento',
    volume_unit: '1 Kg'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
    window.alert = jest.fn();
  });

  test('renderiza componentes iniciais corretamente', async () => {
    getCampaign.mockResolvedValueOnce([mockCampaign]);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    expect(screen.getByRole('heading', { name: /registrar doação/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/código de barras/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantidade/i)).toBeInTheDocument();
  });

  test('carrega e exibe campanha única automaticamente', async () => {
    getCampaign.mockResolvedValueOnce([mockCampaign]);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Campanha Teste')).toBeInTheDocument();
    });
  });

  test('exibe mensagem quando não há campanhas', async () => {
    getCampaign.mockResolvedValueOnce([]);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    await waitFor(() => {
      expect(screen.getByText('Nenhuma campanha disponível')).toBeInTheDocument();
    });
  });

  test('registra doação com sucesso e exibe informações do produto', async () => {
    getCampaign.mockResolvedValueOnce([mockCampaign]);
    createDonation.mockResolvedValueOnce({ success: true });
    getProduct.mockResolvedValueOnce(mockProduct);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/código de barras/i)).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/código de barras/i), {
        target: { value: '7893500020110' }
      });
      fireEvent.change(screen.getByLabelText(/quantidade/i), {
        target: { value: '5' }
      });
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /registrar doação/i }));
    });

    await waitFor(() => {
      expect(screen.getByText(`${mockProduct.name} - ${mockProduct.brand}`)).toBeInTheDocument();
      expect(screen.getByText('5 unidades')).toBeInTheDocument();
    });
  });

  test('valida campos obrigatórios', async () => {
    getCampaign.mockResolvedValueOnce([mockCampaign]);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: /registrar doação/i }));
    });

    expect(window.alert).toHaveBeenCalledWith('Por favor, insira o código de barras do produto');
  });

  test('limpa campos após doação bem-sucedida', async () => {
    getCampaign.mockResolvedValueOnce([mockCampaign]);
    createDonation.mockResolvedValueOnce({ success: true });
    getProduct.mockResolvedValueOnce(mockProduct);

    await act(async () => {
      render(<RegisterDonatePage />);
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/código de barras/i), {
        target: { value: '7893500020110' }
      });
      fireEvent.change(screen.getByLabelText(/quantidade/i), {
        target: { value: '5' }
      });
      fireEvent.submit(screen.getByRole('button', { name: /registrar doação/i }));
    });

    await waitFor(() => {
      expect(screen.getByLabelText(/código de barras/i)).toHaveValue('');
      expect(screen.getByLabelText(/quantidade/i)).toHaveValue(null);
    });
  });
});