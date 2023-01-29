//formating for any us dollar and us dates in porject
export const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
});

export const datef = new  Intl.DateTimeFormat("us-en",{
    dateStyle:"short"
  })