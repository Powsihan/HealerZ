import React from 'react';
import MedRecordModal from './MedRecordModal';
import { useState } from 'react';
import DateTime from '../algorithms/DateTime';

export default function MedicalRecords(props) {

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    const { date,complain ,examination ,tests ,diagnosis} = props;

    return (
        <>
            <tr>
                <td style={{ minWidth: '100px', }}><DateTime dateTime={date} /></td>
                <td className='text-truncate' style={{ maxWidth: '50px', }}>{complain}</td>
                <td className='text-truncate' style={{ maxWidth: '50px', }}>{examination}</td>
                <td className='text-truncate' style={{ maxWidth: '50px', }}>{tests}</td>
                <td className='text-truncate' style={{ maxWidth: '50px', }}>{diagnosis}</td>
                <td className='text-center'><button className='btn text-white btn-gr p-1' onClick={toggleModal}>View</button></td>
            </tr>
            <MedRecordModal show={showModal} onHide={toggleModal} recordData={props}/>
        </>
    )
}
