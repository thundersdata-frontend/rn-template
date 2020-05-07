import React from 'react';
import { Text } from 'react-native';
import CustomTable, { ColumnProps } from '../../../../../../components/CustomTable';
import { valueFormat } from '../../../../../../utils/string';
import Container from '../../../../../../components/Container';

export default function ChartTable() {
  interface ListItem {
    customerName: string;
    province: string;
    salesAmount: number;
  }
  const mapTableColumns: ColumnProps<ListItem>[] = [
    {
      title: '客户名',
      dataIndex: 'customerName',
      key: 'customerName',
      width: 50
    },
    {
      title: '地区',
      dataIndex: 'province',
      key: 'province',
      width: 20
    },
    {
      title: '销售额(元)',
      dataIndex: 'salesAmount',
      render: ({ salesAmount }) => <Text>{valueFormat(salesAmount)}</Text>,
      width: 30
    }
  ];

  return (
    <Container>
      <CustomTable
        dataSource={[
          { customerName: '国药药材山西晋城有限公司', province: '山东省', salesAmount: 1923100000000 },
          { customerName: '国药控股天津有限公司', province: '山东省', salesAmount: 44560000 },
          { customerName: '其他', province: '/', salesAmount: 9231 }
        ]}
        columns={mapTableColumns}
      />
    </Container>
  );
}
