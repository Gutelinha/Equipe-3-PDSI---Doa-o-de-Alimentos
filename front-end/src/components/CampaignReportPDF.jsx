import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const rotaryLogo = require('../assets/rotary-logo.png');

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica'
  },
  header: {
    backgroundColor: '#f97316',
    padding: 10,
    color: 'white',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 104,
    height: 45,
    marginRight: 80,
    objectFit: 'contain'
  },
  headerContent: {
    flex: 1
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: 10,
    marginBottom: 2
  },
  headerText: {
    fontSize: 8,
    marginBottom: 1
  },
  section: {
    margin: 5,
    padding: 5
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 8
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bfbfbf'
  },
  tableHeader: {
    backgroundColor: '#f97316',
    color: 'white'
  },
  productCell: {
    flex: 2,
    padding: 4,
    fontSize: 8,
    borderRightWidth: 1,
    borderRightColor: '#bfbfbf'
  },
  quantityCell: {
    flex: 1,
    padding: 4,
    fontSize: 8,
    textAlign: 'right',
    borderRightWidth: 1,
    borderRightColor: '#bfbfbf'
  },
  unitCell: {
    flex: 1,
    padding: 4,
    fontSize: 8,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#bfbfbf'
  },
  volumeCell: {
    flex: 1,
    padding: 4,
    fontSize: 8,
    textAlign: 'right'
  },
  productType: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    backgroundColor: '#fff7ed',
    padding: 6,
    color: '#9a3412'
  },
  totalItems: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 4
  }
});

const CampaignReportPDF = ({ report }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image source={rotaryLogo} style={styles.logo} />
        <View style={styles.headerContent}>
          <Text style={styles.title}>{report.campaign_name}</Text>
          <Text style={styles.subtitle}>
            Status: {report.active_campaign ? 'Ativa' : 'Encerrada'}
          </Text>
          <Text style={styles.headerText}>
            Data de Início: {report.campaign_start_date}
          </Text>
          {report.campaign_end_date && (
            <Text style={styles.headerText}>
              Data de Fim: {report.campaign_end_date}
            </Text>
          )}
        </View>
        <Text style={styles.totalItems}>
          {report.total_items_donated} itens
        </Text>
      </View>

      {report.donated_product_types.map((type, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.productType}>
            {type.type} ({type.items_donated} itens)
          </Text>
          
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.productCell}>Produto</Text>
              <Text style={styles.quantityCell}>Quantidade</Text>
              <Text style={styles.unitCell}>Unidade</Text>
              <Text style={styles.volumeCell}>Volume Total</Text>
            </View>
            
            {type.donated_products.map((product, idx) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.productCell}>{product.name}</Text>
                <Text style={styles.quantityCell}>{product.quantity}</Text>
                <Text style={styles.unitCell}>{product.volume_unit}</Text>
                <Text style={styles.volumeCell}>{product.total_volume}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export default CampaignReportPDF;