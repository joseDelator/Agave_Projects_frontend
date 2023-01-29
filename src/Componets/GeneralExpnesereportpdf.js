import React, {useEffect, useState} from 'react'
import { Page, Text, View,Document, StyleSheet } from '@react-pdf/renderer';
import api from '../api';
import { dollars, datef } from '../Functions/DateandDollarFormate';
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 25 },
  title:{
    width:"100%",
    backgroundColor:"grey",
    fontSize: 24,
    textAlign:"center",
    margin:10
  },
  table: {
    fontSize: 10,
    width: 550,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "stretch",
    flexWrap: "nowrap",
    alignItems: "stretch",
    flexGrow: 0,
    flexShrink: 0,
  },
  cell: {
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    padding:"5px",
    textAlign:"center",
    alignSelf: "stretch"
  },
  header: {
    backgroundColor: "#eee"
  },
  headerText: {
    fontSize: 12,
    fontWeight: 1200,
    margin: 8
  },
  tableText: {
    fontSize: 10,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
  

const GeneralExpnesereportpdf = () => {
  const [Expense_data, setExpense_data] = useState([])
  const Today= new Date()
    const Lastmonth= new Date().setDate(Today.getDate()-30)
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const [DateRange, setDateRange] = useState({
      startDate: new Date(Lastmonth).toLocaleDateString('en-CA', options),
      endDate: new Date().toLocaleDateString('en-CA', options)
  });
  useEffect (() => {
    let headersList = {      
        "Content-Type": "application/json" 
       }
       let reqOptions = {
        url: "GeneralExpensesByDate",
        method: "POST",
        headers: headersList,
        data:JSON.stringify({
         "Start": DateRange.startDate,
         "End":DateRange.endDate
       })
      } 
       const fetch_somethe= async () =>{
        const reponse = await api.request(reqOptions);
        const timecard_data = reponse.data;
       setExpense_data(timecard_data)
        }

    fetch_somethe();
}, [ DateRange])
const Tablerows = Expense_data.map((Expense_entree, e)=>{
  return <View style={[styles.row]} key={Expense_entree.Expense_ID}>
          <Text style={[styles.cell]}>{Expense_entree.Seller_Name}</Text>
          <Text style={[styles.cell]}>{ dollars.format(Expense_entree.Cost)}</Text>
          <Text style={[styles.cell]}>{datef.format(new Date(Expense_entree.Date.replace(/-/g, '/')))}</Text>
          <Text style={[styles.cell]}>{Expense_entree.Expense_Type}</Text>
          <Text style={[styles.cell]}>{Expense_entree.Description}</Text>
        </View>
})
    return (
        <Document>
          <Page style={styles.page}  wrap>
            <View>
              <Text style={[styles.title]}>Gerenal Expenses</Text>
            </View>
            <View style={styles.table}>
                  <View style={[styles.row, styles.header]}>
                      <Text style={[styles.headerText, styles.cell]}>Seller</Text>
                      <Text style={[styles.headerText, styles.cell]}>Cost</Text>
                      <Text style={[styles.headerText, styles.cell]}>Date</Text>
                      <Text style={[styles.headerText, styles.cell]}>Category</Text>
                      <Text style={[styles.headerText, styles.cell]}>Description</Text>
                  </View>
                  {Expense_data&&Tablerows} 
            </View>
          </Page>
    </Document>
    )
}

export default GeneralExpnesereportpdf
