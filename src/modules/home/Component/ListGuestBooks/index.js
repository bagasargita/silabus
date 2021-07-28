import React from 'react';
import AppCard from '../../../../@crema/core/AppCard';
import TransactionTable from './TransactionTable';
import AppSelect from '../../../../@crema/core/AppSelect';
import {useIntl} from 'react-intl';

const ListGuestBooks = ({transactionData}) => {
  const handleSelectionType = (data) => {
    console.log('data: ', data);
  };
  const {messages} = useIntl();
  return (
    <AppCard
      height={1}
      contentStyle={{paddingLeft: 0, paddingRight: 0}}
      title={messages['dashboard.analytics.ordersTransaction']}>
      <TransactionTable transactionData={transactionData} />
    </AppCard>
  );
};

export default ListGuestBooks;
