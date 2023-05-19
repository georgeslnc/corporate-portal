module.exports = (phone) => phone.replace(/^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+7 ($2) $3-$4-$5');
