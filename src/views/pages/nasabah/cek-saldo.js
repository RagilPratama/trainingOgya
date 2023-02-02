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
import Swal from 'sweetalert2'

// const historyBank = () => {

class cekSaldo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            openModal: false,
            noRekening: '',
            dataRekening: [],
            nama: '',
            saldo: ''

        }
    }

    componentDidMount() {
        fetch(
            "http://localhost:7070/api/transaksi-nasabah/getOptionsTrnb")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data.data,
                    DataisLoaded: true
                }, () => console.log(json));
            })
    }

    handleChange = (e) => {
        this.setState({ noRekening: e.target.value })
    }

    getSaldo = () => {

        if (this.state.noRekening !== '') {
            fetch(
                "http://localhost:7070/api/master-bank/getMasterBank?noRekening=" + this.state.noRekening
            ).then((res) => res.json())
                .then((json) => {


                    if (json.data.data.length !== 0) {

                        let arr = json.data.data
                        this.setState({ dataRekening: arr }, () => this.cekSaldo())
                    } else {
                        Swal.fire({
                            title: 'Info!',
                            text: 'No Rekening Tidak Ditemukan',
                            icon: 'info',
                            confirmButtonText: 'OK'
                        })
                    }
                    console.log('json >>', json.data.data);
                })

        } else {
            Swal.fire({
                title: 'Info!',
                text: 'Mohon Masukkan No Rekening',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        }


    }

    cekSaldo = (e) => {

        const nama = this.state.dataRekening[0].nama
        const saldo = this.state.dataRekening[0].saldo
        console.log(nama)
        this.setState({ openModal: true, nama: nama, saldo: saldo })

    }

    handleOpenModal = () => {
        this.setState({ openModal: !this.state.openModal })
    }

    formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    render() {
        const columns = [
            {
                // key: 'idTransaksiNasabah',
                // label: 'ID Transaksi',
                // _props: { scope: 'col' },
                name: 'idTransaksiNasabah',
                selector: row => row.idTransaksiNasabah,
            },
            {
                // key: 'tanggal',
                // label: 'Tanggal',
                // _props: { scope: 'col' },
                name: 'Tanggal',
                selector: row => row.tanggal,
            },
            {
                selector: row => row.noRekening,
                name: 'No Rekening',
                // _props: { scope: 'col' },
            },
            {
                key: 'statusKet',
                label: 'Status',
                _props: { scope: 'col' },
            },
            {
                key: 'statusNasabah',
                label: 'Nama',
                _props: { scope: 'col' },
            },
            {
                key: 'uangNasabah',
                label: 'Nominal',
                _props: { scope: 'col' },
            },
            {
                key: 'noRekeningDituju',
                label: 'No Rekening Dituju',
                _props: { scope: 'col' },
            },
            {
                key: 'noTelepon',
                label: 'No Telepon',
                _props: { scope: 'col' },
            },
        ]
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
                    // minHeight: '72px', // override the row height
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
                            <strong>Cek Saldo Rekening</strong>

                        </CCardHeader>
                        {/* <CAccordion> */}
                        <div className='form-input'>
                            <CRow className="form-group row mt-2">
                                <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                <CCol xs="10" md="8" className="mt-2">
                                    <CFormInput size='md' type="number" id="noRekening" placeholder="Masukkan no rekening" onChange={this.handleChange} value={this.state.noRekening} />
                                </CCol>
                            </CRow>
                            <br></br>
                            <CRow className="form-group row mt-2">
                                {/* <CCol xs = "20" md="8" className="mt-2"> */}
                                <CButton color="info" style={{ display: 'flex', justifyContent: 'center', width: '20%', margin: 'auto' }} onClick={this.getSaldo} >Cek Saldo</CButton>
                                {/* </CCol> */}
                            </CRow>

                        </div>
                        <CCardBody>
                        </CCardBody>
                    </CCard>
                </CCol>

                <>
                    <CModal alignment="center" visible={this.state.openModal} onClose={this.handleOpenModal}>
                        <CModalHeader>
                            <CModalTitle>Detail Rekening</CModalTitle>
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
            </CRow>
        );
    }
}

export default cekSaldo