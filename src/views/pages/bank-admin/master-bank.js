import React, { Component } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CSmartTable,
    CAccordion,
    CAccordionHeader,
    CAccordionBody,
    CFormLabel,
    CFormInput,
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import Swal from 'sweetalert2'

class masterBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            noRekening: null,
            nama: '',
            alamat: '',
            noTelepon: null,
            saldo: null,
            user_id: null,

            openModal: false,
            currentPage: 1,
            sizePerPage: 5,
        }
    }

    componentDidMount() {
        this.getmasterBank()
    }

    getmasterBank = () => {
        fetch(
            "http://localhost:7070/api/master-bank/getMasterBank")
            .then((res) => res.json())
            .then((json) => {
                console.log(json, "<<<<<<")
                this.setState({
                    items: json.data.data,
                    DataisLoaded: true
                }, () => console.log(json));
            })
    }

    formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    handleOpenModal = () => {
        this.setState({ openModal: !this.state.openModal })
    }

    addData = () => {

    }

    edit = () => {

    }

    delete = () => {

    }

    render() {
        const columns = [
            {
                selector: (cell, row, rowIndex) => {
                    let rowNumber = (this.state.currentPage - 1) * this.state.sizePerPage + (row + 1);
                    return <span>{rowNumber}</span>;
                },
                name: 'No',
                headerAlign: 'center',
                align: 'center',
                editable: false,
                headerStyle: (colum, colIndex) => {
                    return { width: '50px' };
                },
            },
            {
                name: 'No Rekening',
                selector: row => row.noRekening,
            },
            {
                name: 'Nama',
                selector: row => row.nama,
            },
            {
                name: 'Alamat',
                selector: row => row.alamat
            },
            {
                name: 'No Telepon',
                selector: row => row.noTelepon
            },
            {
                name: 'Saldo',
                selector: row => this.formatRupiah(row.saldo)
            },
            {
                name: 'User ID',
                selector: row => row.userID
            },
            {
                name: 'Aksi',
                // cell: (cellContent, row) => (
                //     <td>
                //         <CButtonGroup>
                //             <CButton color="primary"> Edit </CButton>
                //         </CButtonGroup>
                //     </td>
                // )
                formatter: (value, row, index, field) => {
                    return <td>
                        <CButtonGroup>
                            <CButton type="button" class="btn btn-default btn-sm" onclick={this.edit}>,
                                <i class="far fa-pencil-alt"></i>
                            </CButton>
                            <CButton type="button" class="btn btn-default btn-sm" onclick={this.delete}>,
                                <i class="far fa-trash-alt"></i>
                            </CButton>
                        </CButtonGroup>
                    </td>
                }
            },
        ];

        // const items = [
        //     {
        //         id: 1,
        //         // class: 'Mark',
        //         norek: 'Otto',
        //         norekdituju: '@mdo',
        //         _cellProps: { id: { scope: 'row' } },
        //     },
        //     {
        //         id: 2,
        //         // class: 'Jacob',
        //         norek: 'Thornton',
        //         norekdituju: '@fat',
        //         _cellProps: { id: { scope: 'row' } },
        //     },
        //     {
        //         id: 3,
        //         nama: 'Larry the Bird',
        //         norek: '@twitter',
        //         _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
        //     },
        // ]

        const customStyles = {
            rows: {
                style: {
                    minHeight: '60px', // override the row height
                },
            },
            headCells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for head cells
                    paddingRight: '8px',
                },
            },
            cells: {
                style: {
                    paddingLeft: '8px', // override the cell padding for data cells
                    paddingRight: '8px',
                },
            },
        };


        return (
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Master Bank</strong>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton color="primary" className="me-md-2" style={{ marginBottom: '20px' }} onClick={this.handleOpenModal}><CIcon icon={cilPlus} /> Tambah </CButton>
                            </div>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                                pagination
                                columns={columns}
                                data={this.state.items}
                                responsive
                                highlightOnHover
                                striped
                                customStyles={customStyles}
                            >
                            </DataTable>
                        </CCardBody>
                    </CCard>
                </CCol>

                <>
                    <CModal alignment="center" visible={this.state.openModal} onClose={this.handleOpenModal}>
                        <CModalHeader>
                            <CModalTitle>Tambah Data</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        {this.state.nama}
                                    </CCol>
                                </CRow>
                                <br></br>
                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        {this.state.noRekening}
                                    </CCol>
                                </CRow>
                                <br></br>
                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Saldo</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <strong>{this.formatRupiah(this.state.saldo)} </strong>
                                    </CCol>
                                </CRow>
                            </div>
                        </CModalBody>
                        <CModalFooter>
                        </CModalFooter>
                    </CModal>
                </>

                {/* <CSmartTable
                                items={this.state.items}
                                fields={columns}
                                columnFilter
                                tableFilter
                                footer
                                itemsPerPageSelect
                                itemsPerPage={5}
                                hover
                                sorter
                                pagination
                                scopedSlots={{
                                    'status':
                                        (item) => (
                                            <td>
                                                <CBadge color={getBadge(item.status)}>
                                                    {item.status}
                                                </CBadge>
                                            </td>
                                        ),
                                    'show_details':
                                        (item, index) => {
                                            return (
                                                <td className="py-2">
                                                    <CButton
                                                        color="primary"
                                                        variant="outline"
                                                        shape="square"
                                                        size="sm"
                                                        onClick={() => { toggleDetails(index) }}
                                                    >
                                                        {details.includes(index) ? 'Hide' : 'Show'}
                                                    </CButton>
                                                </td>
                                            )
                                        },
                                    'details':
                                        (item, index) => {
                                            return (
                                                <CCollapse show={details.includes(index)}>
                                                    <CCardBody>
                                                        <h4>
                                                            {item.username}
                                                        </h4>
                                                        <p className="text-muted">User since: {item.registered}</p>
                                                        <CButton size="sm" color="info">
                                                            User Settings
                                                        </CButton>
                                                        <CButton size="sm" color="danger" className="ml-1">
                                                            Delete
                                                        </CButton>
                                                    </CCardBody>
                                                </CCollapse>
                                            )
                                        }
                                }}
                            /> */}
            </CRow>
        );
    }
}

export default masterBank