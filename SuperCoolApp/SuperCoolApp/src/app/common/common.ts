import { Injectable } from '@angular/core';

@Injectable()
export class Common {
    static transactionType = {
        payment: "payment",
        refund: "refund",
        adjustment: "adjustment",
        dishonour: "dishonour"
    };

    static paymentType = {
        cash: "cash",
        cheque: "cheque",
        paybal: "pay-bal",
        invo: "invo",
        writeoff: 'write off',
        bankaccount: 'bank account',
        paymentcard: 'payment card'
    };

    static dateFormat = {
        ddMMyyyy: "dd/MM/yyyy",
        dMMMyyyy: "d-MMM-yyyy",
        ddMMyyyyHHMM: "dd/MM/yyyy hh:mm"
    }

    static httpErrorMessage = {
        unknownStatus: "We are sorry - an unknown error has occured. Please try again and contact the Bupa IS Service Desk if the issue persists.",
        status400: "Data cannot be returned as it received a bad request. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 400 - bad request)",
        status401: "Authentication to use this service is required and has failed or has not yet been provided. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 401 - unauthorised)",
        status403: "It looks like you do not have the correct permissions required to use this resource. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 403 - forbidden)",
        status404: "The requested resource could not be found. (error 404 - not found)",
        status422UserIdNotSetUpInBOSS: "Payments cannot be processed as user is not setup correctly in BOSS",
        status422UserIdNotAssociatedWithBranch: "Payments cannot be processed as teller has not been started up.",
        status422UserBranchNotReconciled: "Payments cannot be processed as teller has not been reconciled.",
        status422Other: "Data cannot be returned as it received a bad request. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 422- Other)",
        status406: "We are sorry - something went wrong with the request sent to the service. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 406 - not acceptable)",
        status500: "We are sorry - an internal server error has occured. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 500 - internal server error)",
        status503: "We are sorry - the service is currently unavailable. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 503 - service unavailable)",
        status408: "We are sorry - a timeout has occurred. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 408 - request timeout)",
        status512: "We are sorry - a timeout has occurred.  Please try again and contact the Bupa IS Service Desk if the issue persists. (error 512 - request timeout)",
        status524: "We are sorry - a timeout has occurred. Please try again and contact the Bupa IS Service Desk if the issue persists. (error 524 - request timeout)"
    };

    static paymentOptions = {
        directdebit: "directdebit",
        singlepayment: "singlepayment",
        refund: "refund"
    }

    static frequency = {
        weekly: "Weekly",
        fortnightly: "Fortnightly",
        monthly: "Monthly",
        quarterly: "Quarterly",
        sixMonthly: "Six Monthly",
        yearly: "Yearly",
        unknown: "Unknown"
    }

    static paymentTypeForDirectDebit = {
        cash: "Cash",
        cheque: "Cheque",
        paymentCard: "Payment Card",
        bankAccount: "Bank Account"
    }

    static directDebitErrorMessage = {
        unknowFrequency: "The direct debit frequency on this policy is not valid. Please take action to fix.",
        invalidNextDebitDate: "Next Direct Debit Date will only allow future dates that does not fall on 29, 30, 31 of the month",
        invalidFrequency: 'The frequency of "weekly" is not suitable for the selected Payment Type. Please select a different frequency or Payment Type.',
        invalidAmountTendered: "Please enter an amount that is equal to or larger than the Catch Up Amount.",
        requiredAmountTendered: "Amount Tendered is required.",
        negativeAmountTendered: "Amount Tendered cannot be a negative value. Please enter another value.",
        notAcceptPreviousDayOfNextDebitDate: "A Direct Debit cannot be setup to a date in the past. Please select a future date.",
        frequencyNextDirectDebitWarning: "A Direct Debit cannot be setup on the 29th, 30th or 31st for this payment frequency. Direct Debit date has been moved to the next available date.",
        invalidNextDirectDebit: "The Next Direct Debit is not valid. Please change another value.",
        payNowIsSetToNo: "Processing a future dated payment will result in the policy being un-financial for a period of time. Please make changes if necessary",
        frequencyHasBeenChanged: "The policy currently has an invalid Direct Debit frequency. Proceeding will amend this to the frequency of ",
        confirmClickAndPayNowIsNo: "Not taking a payment today will result in the Policy being un-financial until the next direct debit date. Please make changes if necessary.",
        confirmHavePendingPayment: "A Direct Debit transaction currently exists. Click 'Proceed' to replace it.",
        pendingTransactionAlert: "The calculator has been automatically populated with existing pending payment data from core systems."
    }

    static refundErrorMessages = {
        invalidRefundDate: 'Refund Date can not be a previous date.',
        invalidPayee: 'Payee can not contain numbers.',
        invalidRefundAmount: 'Please enter a Refund Amount that is larger than zero.',
        pendingRefund: 'There is a Refund that is currently pending for this membership.',
        newDatePaidToLessThanClaimDate: "This refund will impact a previous claim made by the customer. Please make changes if necessary.",
        newDatePaidToLessThanDatePaidTo: "This refund will result in a non-financial status for the customer. Please make changes if necessary.",
        pendingRefundTransaction: "A pending refund transaction currently exists."
    }

    static singlePaymentErrorMessages = {
        invalidAmountTendered: "Amount Tendered cannot be a negative value. Please enter another value. ",
        invalidAmount: "Amount cannot be a negative value. Please enter another value. ",
        requiredAmountTendered: "Amount Tendered is required.",
        invalidMaxDateNewDatePaidTo: "Payment date cannot be in the future.",
        invalidMinDateNewDatePaidTo: "Payment Date could not be backdated date. Please select another date.",
        invalidPeriod: "Period cannot be a negative value. Please enter another value.",
        invalidNewDatePaidTo: "New Date paid To exceeds 14 months from today's date. Please recalculate.",
        invalidFormatPaymentDate: "The Payment Date is not valid. Please change another value.",
        invalidFormatNewDatePaidTo: "The New Date Paid To is not valid. Please change another value.",
        invalidRequiredAmount: 'Amount is required.',
        invalidPaymentDetails: 'Payment Details is required.',
        invalidPaymentDate: 'Payment Date is required.',
        paymentDateAfterCurrentDate: "Processing a future dated payment will result in the policy being un-financial for a period of time. Please make changes if necessary.",
        transactionDate: "A cash transaction cannot be future dated. Please revise.",
        newDatePaidToAfterCurrentDate: "Processing a future dated payment will result in the policy being un-financial for a period of time. Please make changes if necessary.",
        warningTransactionExists: " A Single Payment transaction currently exists. Selecting Confirm will replace the existing transaction.",
        newDatePaidToExceedFromTodayDate: "The new date paid to exceeds the amount of time that the customer can be paid in advance from today. Please revise.",
        proceedConfirmButton: "A Single Payment transaction currently exists in core. Select Proceed to replace the existing transaction.",
        newDatePaidToExceed14Month: "The new date paid to exceeds the amount of time that the customer can be paid in advance from today. Please revise."
    }

    static paymentPendingMessages = {
        confirmWithMisalignment: "Cancelling this payment will cause the customer's next direct debit date and their DPT to be misaligned. Select Proceed to cancel the transaction.",
        confirmDeleteTransaction: "Are you sure you want to cancel the transaction?"
    };

    static digit = {
        decimalTwoPrecision: "1.2-2"
    }

    static convertToUtcTime(date: Date): Date {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    }

    static paymentTypes = {
        cash: "Cash",
        cheque: "Cheque",
        bankAccount: "Bank Account",
        paymentCard: "Payment Card"
    }

    static bankTypeValues = {
        "Bank Account": 421320000,
        "Payment Card": 0
    }

    static levelOfCover = {
        OHSC: "ohsc",
        AIC: "aic"
    }

    static pendingPayments = {
        421320000: true,
        421320001: false
    }
}