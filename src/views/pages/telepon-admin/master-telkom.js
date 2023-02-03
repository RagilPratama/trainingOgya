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
import { cilPlus, cilSave, cilX } from '@coreui/icons';
import Swal from 'sweetalert2'

class masterTelkom extends Component {
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
            "http://localhost:7070/api/master-pelanggan/getPelangganAll")
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

    handleChangeNoRekening = (e) => {
        this.setState({ noRekening: e.target.value.replace(/\D/, '') })
    }

    handleChangeNama = (e) => {
        this.setState({ nama: e.target.value.replace(/[^a-zA-Z,. ]/g, '') })
    }

    handleChangeAlamat = (e) => {
        this.setState({ alamat: e.target.value })
    }

    handleChangeNoTelepon = (e) => {
        this.setState({ noTelepon: e.target.value.replace(/\D/, '') })
    }

    handleChangeSaldo = (e) => {
        this.setState({ saldo: e.target.value.replace(/\D/, '') })
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
                name: 'ID Pelanggan',
                selector: row => row.ID_PELANGGAN,
            },
            {
                name: 'Nama',
                selector: row => row.NAMA,
            },
            {
                name: 'Alamat',
                selector: row => row.ALAMAT
            },
            {
                name: 'No. Telepon',
                selector: row => row.NO_TELP
            },
            
            {
                name: 'User ID',
                selector: row => row.USER_ID
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
                            <strong> Master Telkom </strong>
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
                    <CModal alignment="center" style={{ width: '100%', height: '100%' }} visible={this.state.openModal} onClose={this.handleOpenModal}>
                        <CModalHeader>
                            <CModalTitle>Tambah Data</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noRekening" placeholder="Masukkan No Rekening" onChange={this.handleChangeNoRekening} value={this.state.noRekening} />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="nama" placeholder="Masukkan Nama Lengkap" onChange={this.handleChangeNama} value={this.state.nama} />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Alamat</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="alamat" placeholder="Masukkan Alamat" onChange={this.handleChangeAlamat} value={this.state.alamat} />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Telepon</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noTelepon" placeholder="Masukkan No. Telepon" onChange={this.handleChangeNoTelepon} value={this.state.noTelepon} />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4 mb-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Saldo</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="saldo" placeholder="Masukkan Saldo" onChange={this.handleChangeSaldo} value={this.state.saldo} />
                                    </CCol>
                                </CRow>
                            </div>
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="danger" onClick={() => this.setState({ openModal: false })}>
                                Batal
                            </CButton>
                            <CButton color="primary" onClick={() => this.addData}>
                                Simpan
                            </CButton>
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

export default masterTelkom