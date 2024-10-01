const displayINRCurrency = (num) => {
    const formatter = new Intl.NumberFormat('es-BO', {
        style: "currency",
        currency: 'BOB',
        minimumFractionDigits: 2
    });

    return formatter.format(num);
};

export default displayINRCurrency