import React from "react"
import Button from 'react-bootstrap/Button'

const dateFormat = date => {
  let dateArray = date.split('-')
  let newFormatArray = [dateArray[1], dateArray[2], dateArray[0] ]
  let newFormat = newFormatArray.join(" / ")
  return newFormat
}

const JournalEntry = (props) => {
  return(
    <tr>
      <td>{dateFormat(props.entry.date)}</td>
      <td className="journal-content">{props.entry.content}</td>
      <td><Button variant="link" className="routine-button journal-delete-button" onClick={() => props.handleDeleteClick(props.id)}>✘</Button></td>
    </tr>
    
  )
}

export default JournalEntry