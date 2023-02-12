//formating for any us dollar and us dates in porject
export const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
});

export const datef = new  Intl.DateTimeFormat("us-en",{
    dateStyle:"short"
  })
  const Today= new Date()
  export const Lastmonth= new Date().setDate(Today.getDate()-30)
  export const options = { year: 'numeric', month: 'numeric', day: 'numeric' };