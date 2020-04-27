import React, {useState} from "react"

const ContractorForm = (props) => {
  const defaultNewContractor = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    postalCode: "",
    weeklyHoursAvailable: 0
  }

  const handleChange = (event) => {
    setContractor({
      ...contractor,
      [event.currentTarget.id]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.onContractorAdd(contractor)
    setContractor(defaultNewContractor)
  }

  const [contractor, setContractor] = useState(defaultNewContractor)
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Contractor</h2>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input 
          type="text" 
          name="firstName" 
          id="firstName"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input 
          type="text" 
          name="lastName" 
          id="lastName"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="emailAddress">Email</label>
        <input 
          type="email" 
          name="emailAddress" 
          id="emailAddress"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input 
          type="text" 
          name="postalCode" 
          id="postalCode"
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="weeklyHoursAvailable">Weekly Hours Available</label>
        <input 
          type="text" 
          name="weeklyHoursAvailable" 
          id="weeklyHoursAvailable"
          onChange={handleChange}
        />
      </div>

      <div>
        <input type="submit" value="Add Contractor" />
      </div>
    </form>
  )
  
}

export default ContractorForm