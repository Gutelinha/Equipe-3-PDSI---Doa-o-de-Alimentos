// src/pages/CampaignReportPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCampaignReport } from '../api/Report';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CampaignReportPDF from '../components/CampaignReportPDF';

const CampaignReportPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchReport = async () => {
          try {
            const response = await getCampaignReport(name);
            if (!response) {
              alert('Erro ao gerar relatório');
              navigate('/visualizar-campanhas');
              return;
            }
            setReport(response);
          } catch (error) {
            console.error('Erro ao buscar relatório:', error);
            alert('Erro ao gerar relatório');
            navigate('/visualizar-campanhas');
          } finally {
            setLoading(false);
          }
        };
      
        fetchReport();
      }, [name, navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-orange-500">Gerando relatório...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="relative p-4 md:p-8 lg:p-10">
        <button 
          onClick={() => navigate('/visualizar-campanhas')} 
          className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
        >
          Voltar
        </button>
        <h2 className="text-orange-500 text-xl md:text-2xl font-bold text-center">
          Relatório da Campanha
        </h2>
      </div>

      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cabeçalho do Relatório */}
          <div className="bg-orange-500 text-white p-6">
            <h3 className="text-2xl font-bold mb-4">{report.campaign_name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p>Status: {report.active_campaign ? 'Ativa' : 'Encerrada'}</p>
                <p>Data de Início: {formatDate(report.campaign_start_date)}</p>
                {report.campaign_end_date && (
                  <p>Data de Fim: {formatDate(report.campaign_end_date)}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{report.total_items_donated}</p>
                <p>Itens Doados</p>
              </div>
            </div>
          </div>

          {/* Detalhes por Tipo */}
          <div className="p-6 space-y-4">
            {report.donated_product_types.map((type, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg bg-orange-100 px-4 py-2 text-left text-sm font-medium text-orange-900 hover:bg-orange-200 focus:outline-none focus-visible:ring focus-visible:ring-orange-500">
                      <div>
                        <span className="font-bold">{type.type}</span>
                        <span className="ml-2 text-orange-700">
                          ({type.items_donated} itens)
                        </span>
                      </div>
                      <ChevronUpIcon
                        className={`${
                          open ? 'rotate-180 transform' : ''
                        } h-5 w-5 text-orange-500`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-700">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                            <th className="text-left">Produto</th>
                            <th className="text-right">Quantidade</th>
                            <th className="text-right">Unidade</th>
                            <th className="text-right">Volume Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {type.donated_products.map((product, idx) => (
                            <tr key={idx}>
                                <td className="py-2">{product.name}</td>
                                <td className="text-right">{product.quantity}</td>
                                <td className="text-right">{product.volume_unit}</td>
                                <td className="text-right">{product.total_volume}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>

          <div className="p-6 bg-gray-50 border-t">
  <PDFDownloadLink
    document={<CampaignReportPDF report={report} />}
    fileName={`relatorio-${report.campaign_name}.pdf`}
  >
    {({ loading: pdfLoading, error }) => (
      <button
        disabled={pdfLoading}
        className="w-full bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
      >
        {pdfLoading ? (
          'Gerando PDF...'
        ) : error ? (
          'Erro ao gerar PDF'
        ) : (
                    <>
                        <span>Baixar PDF</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </>
                    )}
                </button>
                )}
            </PDFDownloadLink>
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CampaignReportPage;