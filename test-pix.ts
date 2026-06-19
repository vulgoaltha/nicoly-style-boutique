import 'dotenv/config';
import { processMercadoPagoPayment } from './src/lib/payment.functions';

async function testPayment() {
  try {
    console.log('Testing PIX payment generation...');
    const result = await processMercadoPagoPayment({
      data: {
        transaction_amount: 100,
        description: 'Test Order 123',
        payment_method_id: 'pix',
        payer: {
          email: 'test@test.com',
          first_name: 'Test',
          last_name: 'User',
          identification: {
            type: 'CPF',
            number: '12345678909'
          }
        }
      }
    });

    console.log('Payment Result:');
    console.log(JSON.stringify(result, null, 2));

    if (result.point_of_interaction?.transaction_data?.qr_code_base64) {
      console.log('SUCCESS: QR Code generated!');
    } else {
      console.log('FAILED: No QR Code found.');
    }
  } catch (error) {
    console.error('Error generating payment:', error);
  }
}

testPayment();
