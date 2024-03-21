import { useState } from 'react';

const DateTimeForm = () => {
 const [date, setDate] = useState('');
 const [time, setTime] = useState('');
 const [address, setAddress] = useState('');
 const [amount, setAmount] = useState(0);

 const handleSubmit = (event) => {
    event.preventDefault();
    alert(`${address} va vous donner ${amount} jetons le ${date} à ${time}`);
 };

 return (
    <form onSubmit={handleSubmit}>
      <label>
        Address:
        <input
          type="string"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Select Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Select Time:
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
 );
};

export default DateTimeForm;
