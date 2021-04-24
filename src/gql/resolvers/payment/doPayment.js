import Stripe from 'stripe';

import UserNotAuthorized from 'errors/UserNotAuthorized';
import PaymentFailed from 'errors/PaymentFailed';

import Reservation from 'models/Reservation';
import User from 'models/User';

const doPayment = async (parent, args, { user }) => {
    const paymentData = args.paymentInput;
    const userForAuthorization = await User.findOne({ email: user.email });

    const stripe = new Stripe(process.env.STRIPE_API);

    /* only allow editing user if it's not another user */
    if (user.userId !== userForAuthorization._id.toString()) {
        throw new UserNotAuthorized();
    }

    const customer = await stripe.customers.create({
        //id: userForAuthorization._id.toString(),
        email: userForAuthorization.email,
        // IBAN: paymentData.IBAN,
        // CVC: paymentData.CVC,
        // YYMM: paymentData.YYMM,
    });

    let customerInvoice;
    if (customer) {
        customerInvoice = await stripe.invoiceItems.create({
            customer: customer.id,
            amount: parseInt(paymentData.totalCost * 100),
            currency: 'eur',
            description: 'Reservation Payment',
        });
    }

    if (customerInvoice) {
        await stripe.invoices.create({
            collection_method: 'send_invoice',
            customer: customerInvoice.customer,
            due_date: new Date(),
        });
    }

    const updatedReservation = await Reservation.findOneAndUpdate(
        { _id: args.reservationId },
        { paid: true },
        { new: true },
    );

    return updatedReservation;
}

export default doPayment;