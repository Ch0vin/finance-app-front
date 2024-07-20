import React , { useState ,useEffect } from 'react';
import api from './api';

const App = () => {
  const [transition ,setTransaction ]= useState([]);
  const [formData ,setFormData] = useState({
    amount :'',
    description : '',
    category : '',
    date_created : '',
    is_income : false

  });


  const fetchTransition = async () => {
    try {
        const response = await api.get('/transactions/');
        setTransaction(response.data);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};

useEffect(()=> {
  fetchTransition();
},[]);

const handleInputChange = (event) => {
  const { name, value, type, checked } = event.target;
  setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
  });
};

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
      await api.post('/transactions/', formData);
      fetchTransition();
      setFormData({
          amount: '',
          description: '',
          category: '',
          date_created: '',
          is_income: false
      });
  } catch (error) {
      console.error('Error submitting form:', error);
  }
};

return (
 
    <div>
        <nav className='navbar navbar-dark bg-primary'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>
                    Finance App
                </a>
            </div>
        </nav>

        <div className='container'>
            <form onSubmit={handleFormSubmit}>
                <div className='mb-3 mt-3'>
                    <label htmlFor='amount' className='form-label'>Amount</label>
                    <input
                        type='text'
                        className='form-control'
                        id='amount'
                        name='amount'
                        onChange={handleInputChange}
                        value={formData.amount}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='category' className='form-label'>Category</label>
                    <input
                        type='text'
                        className='form-control'
                        id='category'
                        name='category'
                        onChange={handleInputChange}
                        value={formData.category}
                    />
                </div>

                <div className='mb-3 mt-3'>
                    <label htmlFor='description' className='form-label'>Description</label>
                    <input
                        type='text'
                        className='form-control'
                        id='description'
                        name='description'
                        onChange={handleInputChange}
                        value={formData.description}
                    />
                </div>

                <div className='mb-3 mt-3'>
                    <label htmlFor='date_created' className='form-label'>Date</label>
                    <input
                        type='text'
                        className='form-control'
                        id='date_created'
                        name='date_created'
                        onChange={handleInputChange}
                        value={formData.date_created}
                    />
                </div>

                <div className='mb-3 mt-3'>
                    <label htmlFor='is_income' className='form-label'>Is Income</label>
                    <input
                        type='checkbox'
                        id='is_income'
                        name='is_income'
                        onChange={handleInputChange}
                        checked={formData.is_income}
                    />
                </div>

                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>

        <table className='table table-striped table-borderd table-hover'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Category</th>
              <th scope='col'>Description</th>
              <th scope='col'>Date</th>
              <th scope='col'>Income/Expense</th>
            </tr>
          </thead>
          <tbody>
            {transition.map((transaction, index) => (
              <tr key={transaction.id}>
                <th scope='row'>{index + 1}</th>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.date_created}</td>
                <td>{transaction.is_income? 'Income' : 'Expense'}</td>
              </tr>
            ))}
          </tbody>
        </table>


        </div>
    </div>
);

};
export default App;
