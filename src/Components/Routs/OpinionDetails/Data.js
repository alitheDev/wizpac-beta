import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Zoom from 'react-reveal/Zoom';

export default function Data(props) {
    return (
        <div className='col-md-10 mx-auto' style={{ height: `calc(100vh - 150px)`, overflow: 'scroll' }}>
            <div className='row'>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Information</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>PPL</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Assessment</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Site Visit</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">NL</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Site Visit</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Rating Report</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>MM</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>Risk Assessment Document</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>RC</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
                <div className='col-md-6 p-2'>
                    <Zoom left>
                        <Accordion className='card_expandable'>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon className='text_grey' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                className='card_expand'
                            >
                                <div className='w-100 p-2 text-center'>
                                    <p className='fw-bold mb-0'>File Closure</p>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='card_expanded'>
                                <table class="table table_style">
                                    <thead className='theme_text'>
                                        <tr>
                                            <th scope="col">File type</th>
                                            <th scope="col">Date/Links</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Action</td>
                                            <td>Initial</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Period</td>
                                            <td>FY23</td>
                                        </tr>
                                        <tr>
                                            <td>Initiation Date</td>
                                            <td>14-Nov-22</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </AccordionDetails>
                        </Accordion>
                    </Zoom>
                </div>
            </div>
        </div>
    )
}
