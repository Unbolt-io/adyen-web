import { PaymentMethod, PaymentMethodsResponseInterface } from '../../../types';
import {
    filterAllowedPaymentMethods,
    filterEcomStoredPaymentMethods,
    filterRemovedPaymentMethods,
    filterSupportedStoredPaymentMethods
} from './filters';

const processStoredPaymentMethod = (pm): PaymentMethod => ({
    ...pm,
    storedPaymentMethodId: pm.id
});

export const processPaymentMethods = (
    paymentMethodsResponse: PaymentMethodsResponseInterface,
    { allowPaymentMethods = [], removePaymentMethods = [] }
): PaymentMethod[] => {
    const { paymentMethods = [] } = paymentMethodsResponse;

    return paymentMethods.filter(filterAllowedPaymentMethods, allowPaymentMethods).filter(filterRemovedPaymentMethods, removePaymentMethods);
};

export const processStoredPaymentMethods = (
    paymentMethodsResponse: any = {},
    { allowPaymentMethods = [], removePaymentMethods = [] }
): PaymentMethod[] => {
    const { storedPaymentMethods = [] } = paymentMethodsResponse;

    return storedPaymentMethods
        .filter(filterSupportedStoredPaymentMethods) // only display supported stored payment methods
        .filter(filterAllowedPaymentMethods, allowPaymentMethods)
        .filter(filterRemovedPaymentMethods, removePaymentMethods)
        .filter(filterEcomStoredPaymentMethods) // Only accept Ecommerce shopper interactions
        .map(processStoredPaymentMethod);
};

export const checkPaymentMethodsResponse = response => {
    if (typeof response === 'string') {
        throw new Error(
            'paymentMethodsResponse was provided but of an incorrect type (should be an object but a string was provided).' +
                'Try JSON.parse("{...}") your paymentMethodsResponse.'
        );
    }

    if (response instanceof Array) {
        throw new Error(
            'paymentMethodsResponse was provided but of an incorrect type (should be an object but an array was provided).' +
                'Please check you are passing the whole response.'
        );
    }

    if (response && !response?.paymentMethods?.length && !response?.storePaymentMethods?.length) {
        console.warn('paymentMethodsResponse was provided but no payment methods were found.');
    }
};
