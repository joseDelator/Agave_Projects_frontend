//formating for any us dollar and us dates in porject
export const dollars = new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
});

export const datef = new  Intl.DateTimeFormat("us-en",{
    dateStyle:"short"
  })

const formater =(date)=>{
    const Today= new Date()
    const dd =new Date(new Date().setDate(Today.getDate()+date))
    const year = dd.getFullYear();
    const month = String(dd.getMonth() + 1);
    const day = String(dd.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export const Lastmonth= formater(-30)
export const thistoday = formater(0)

