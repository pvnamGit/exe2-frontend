import React, { useState, useEffect, useContext } from 'react';
import NavigationBar from '../../common/NavigationBar';
import {
  Box, Typography, Button
} from '@mui/material';
import Body from '../../basic/Body';
import TransactionService from '../../../services/transactions.service';
import { getUserInformation } from '../../../utils/cookies'; 
import { ToastContext } from '../../../context/toast.context';

const SubscriptionPage = (props) => {
  const [transactionNumber, setTransactionNumber] = useState(0);
  const [paid, setPaid] = useState(false);
  const toastContext = useContext(ToastContext);


  const randomTransactionId = () => {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  }

  const confirmPayment = async () => {
    const info = {
      userId: getUserInformation().id,
      transactionId: transactionNumber,
    }
    const result = await TransactionService.createTransactions(info);
    if(result.status) {
      setPaid(true);
      toastContext.addNotification('Success');
    }
  }

  useEffect(() => {
    setTransactionNumber(randomTransactionId());
  }, [])

  return (
    <>
      <NavigationBar
        nav={[
          ['Home', '/'],
          ['Subscriptions'],
        ]}
      />
      <Body>
        <Box style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <img 
            src="image/billing_info.png"
            alt="MOMO"
            style={{
              height: "25rem",
              margin: "0 auto"
            }} />
          <Typography style={{
            margin: 'auto',
            textAlign: 'center'
          }}>
              Noi dung thanh toan: <b>Thanh toan ID {transactionNumber}</b>
          </Typography>
          {!paid && 
          (<Button style={{
            margin: 'auto',
          }} 
          color="primary"
          onClick={confirmPayment}
          >
            Confirm Payment
          </Button>)}
        </Box>
      </Body>
    </>
  );
    
}

export default SubscriptionPage;