import React from "react"

const JournalEntry = (props) => {
  return(
    <tr>
      <td>{props.entry.date}</td>
      <td>{props.entry.content}</td>
      <td><button onClick={() => props.handleDeleteClick(props.id)}>Delete</button></td>
    </tr>
    
  )
}

export default JournalEntry