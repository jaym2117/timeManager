import React, {useState} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
const DatePickerModal = ({datePicker, currDate}) => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Button variant="light" onClick={() => setShow(true)}>
                <i className="fas fa-calendar"></i>
            </Button>    
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            id="currDate"
                            type="date"
                            onFocus={(e) => e.currentTarget.type = "date"}
                            value={currDate}
                            onChange={(e) => {
                                datePicker(e.target.value)
                                setShow(false)
                            }}></Form.Control>
                    </Form.Group>
                </Modal.Header>
            </Modal>
        </>
    )
}

export default DatePickerModal
