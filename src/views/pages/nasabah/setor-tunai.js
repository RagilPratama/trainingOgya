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


class setorTunai extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            openModal: false,
            dataRekening: [],
            userID: '',
            nama: '',
            alamat: '',
            noTelepon: '',
            noRekening: '',
            saldo: '',
            jumlah: '',
            blocking: false,
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

    handleChangeJumlah = (e) => {
        this.setState({ jumlah: e.target.value.replace(/\D/, '') })
    }

    // getmasterBank = () => {
    //     this.setState({ blocking: true });
    //     fetch(
    //         "http://localhost:7070/api/master-bank/getMasterBank")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             this.setState({
    //                 items: json.data.data,
    //                 DataisLoaded: true
    //             }, () => console.log(json));
    //         }).catch((error) => {
    //             this.setState({ blocking: false });
    //         });
    // }

    getSaldo = () => {
        if (this.state.noRekening !== '') {
            fetch(
                "http://localhost:7070/api/master-bank/getMasterBank?noRekening=" + this.state.noRekening
            ).then((res) => res.json())
                .then((json) => {


                    if (json.data.data.length !== 0) {

                        let arr = json.data.data
                        this.setState({ dataRekening: arr }, () => this.cekSaldo())
                        // console.log('Data Rekening >>', arr);
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

    // formatRupiah = (number) => {
    //     return new Intl.NumberFormat("id-ID", {
    //         style: "currency",
    //         currency: "IDR"
    //     }).format(number);
    // }

    cekSaldo = (e) => {
        const nama = this.state.dataRekening[0].nama
        const saldo = this.state.dataRekening[0].saldo
        console.log(nama)
        this.setState({ openModal: true, nama: nama, saldo: saldo })
    }

    setorTunai = () => {
        console.log(this.state.dataRekening[0], "<<<<< STATUS")
        console.log(this.state.jumlah, "<<<<< JUMLAH")

        var s = parseInt(this.state.dataRekening[0].saldo)
        var j = parseInt(this.state.jumlah)
        var total = s + j
        console.log(total, "<<<<< Total")

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                userID: parseInt(this.state.dataRekening[0].userID),
                nama: this.state.dataRekening[0].nama,
                alamat: this.state.dataRekening[0].alamat,
                noTelepon: parseInt(this.state.dataRekening[0].noTelepon),
                noRekening: parseInt(this.state.dataRekening[0].noRekening),
                saldo: total,
            })
        };

        fetch("http://localhost:7070/api/master-bank/update", requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson, "<<<<< STATUS")
                if (responseJson && responseJson.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Setor Tunai Berhasil & Saldo Berhasil Diperbarui',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    this.setState({
                        userID: '',
                        nama: '',
                        alamat: '',
                        noTelepon: '',
                        noRekening: '',
                        saldo: '',
                        jumlah: '',
                    })
                    this.setState({ blocking: false, openModal: false })
                } else {
                    Swal.fire({
                        title: '',
                        text: 'Setor Tunai Gagal',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleOpenModal = () => {
        this.setState({ openModal: true })
    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    render() {
        const columns = [
            {
                name: 'idTransaksiNasabah',
                selector: row => row.idTransaksiNasabah,
            },
            {
                name: 'Tanggal',
                selector: row => row.tanggal,
            },
            {
                selector: row => row.noRekening,
                name: 'No Rekening',
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
        ];

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
                            <strong>Setor Tunai</strong>

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
                                <CButton color="info" style={{ display: 'flex', justifyContent: 'center', width: '20%', margin: 'auto' }} onClick={this.getSaldo} >Cek Rekening</CButton>
                                {/* </CCol> */}
                            </CRow>
                        </div>
                        <CCardBody>
                        </CCardBody>
                    </CCard>
                </CCol>

                <>
                    <CModal alignment="center" visible={this.state.openModal} onClose={this.handleCloseModal}>
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
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nominal Setoran</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="jumlah" placeholder="Masukkan nominal setoran" onChange={this.handleChangeJumlah} value={this.state.jumlah} />
                                    </CCol>
                                </CRow>
                                <br></br>
                                <CRow className="form-group row mt-2">
                                    {/* <CCol xs = "20" md="8" className="mt-2"> */}
                                    <CButton color="info" style={{ display: 'flex', justifyContent: 'center', width: '20%', margin: 'auto' }} onClick={this.setorTunai} >Setor</CButton>
                                    {/* </CCol> */}
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

export default setorTunai