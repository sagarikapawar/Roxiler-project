import React, {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'


class Project extends Component{
    constructor(props){
        super(props);
        this.state={transaction:[], isLoading:true} 

    }
   
    componentDidMount(){
        this.getTransaction()
    }
    getTransaction=async()=>{
        const jwtToken=Cookies.get('jwt-token')
        const apiUrl='https://s3.amazonaws.com/roxiler.com/product_transaction.json'
        const options={
            method:"GET",
            headers:{
                Authorization:`Bearer ${jwtToken}`,
            },
        }
       const response=await fetch(apiUrl,options)
       .then((response) => response.json())
       .then((data) => {
         this.setState({
           transaction: data,
           isLoading:false
         });
       })
       .catch((error) => {
         console.error('Error fetching data:', error);
         this.setState({ isLoading: false });
       });
 
    }
    handleMonthChange = (event) => {
        this.setState({ selectedMonth: event.target.value });
      };
    
      filterTransactionsByMonth = () => {
        const { transaction, selectedMonth } = this.state;
    
        if (selectedMonth === 'all') {
          return transaction;
        } else {
          return transaction.filter(transactions => {
            const transactionMonth = new Date(transactions.date).getMonth() + 1;
            return transactionMonth === parseInt(selectedMonth, 3);
          });
        }
      };
    
    


    render(){
        const { transaction, isLoading } = this.state;

        return(
            <div className='app-container'>
                <div className='tran-container'>
                <div className='inner-container'>
                    <h6 className='heading'>Transaction Dashboard</h6>
                    </div>
                    </div>
                <div class-className='search-container'>
                    <input placeholder="Search transaction" className='input-element'/>
                    <select  className='select-container' >
                        <option value="jan" >Jan</option>
                        <option value="feb">Feb</option>
                        <option Select Month value="march" selected>March</option>
                        <option value="april">April</option>
                        <option value="may">May</option>
                        <option value="june">June</option>
                        <option value="july">July</option>
                        <option value="aug">Aug</option>
                        <option value="sept">Sept</option>
                        <option value="octo">Octo</option>
                        <option value="nov">Nov</option>
                        <option value="dec">Dec</option>
                    </select>
                    </div>
                    <div className='table'>
                    
          <table>
            <thead>
              <tr>
                <th >ID</th>
                <th >Title</th>
                <th >Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map(transactions=> (
                <tr key={transactions.id}>
                  <td>{transactions.title}</td>
                  <td>{transactions.description}</td>
                  <td>{transactions.price}</td>
                  <td>{transactions.category}</td>
                  <td>{transactions.solld}</td>
                  <td>{transactions.image}</td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>

  

                                
                            
                    </div>  
                    
                    
        )
    }
}

export default Project