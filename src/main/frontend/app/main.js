import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";

import ContractorForm from "./ContractorForm"

//useState
//where to replace the CRUD
const App = (props) => {
  const [contractors, setContractors] = useState([])
  const [loading, setLoading] = useState(true)

  const onContractorAdd = (contractor) => {
    setLoading(true)
    fetch("/api/v1/contractors", {
      method: "POST", 
      body: JSON.stringify(contractor),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(resp => {
      return resp.json()
    }).then(json => {
      setLoading(false)
      setContractors([
        ...contractors,
        json
      ])
    }).catch(() => { alert("Your form submission is invalid") })
  }

  const loadContractors = () => {
    fetch("/api/v1/contractors").then((resp) => {
      if(resp.ok) {
        return resp
      }
      else {
        throw new Error(resp.Error)
      }
    }).then(resp => {
      return resp.json();
    }).then(body => {
      setContractors(body)
      setLoading(false)
    })
  }
  useEffect(loadContractors, [])

  const contractorListItems = contractors.map((contractor) => {
    return (<li key={contractor.id}><h3>{ contractor.firstName } { contractor.lastName }</h3></li>)
  })

  let loadingIndicator = <p>Loading...</p>
  if(!loading) {
    loadingIndicator = null
  }

  return (
    <div>
      {loadingIndicator}
      <h1>Active Contractors</h1>
      <ul>{contractorListItems}</ul>
      <ContractorForm onContractorAdd={onContractorAdd} />
    </div>
  )
}

ReactDom.render(<App />,document.getElementById("app"))