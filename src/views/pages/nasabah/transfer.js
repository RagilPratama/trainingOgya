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
    CModalTitle,
    CFormSelect
} from '@coreui/react'

import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2'


class transfer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            openModal: false,
            dataRekening: [],

            // Pengirim
            userIDPengirim: '',
            namaPengirim: '',
            alamatPengirim: '',
            noTeleponPengirim: '',
            noRekeningPengirim: '',
            saldoPengirim: '',

            // Penerima
            userIDPenerima: '',
            namaPenerima: '',
            alamatPenerima: '',
            noTeleponPenerima: '',
            noRekeningPenerima: '',
            saldoPenerima: '',

            jumlahTransfer: '',
            noRekeningPenerima: '',
            noRekeningPenerima_option: [],
            blocking: false,
            rekeningpenerima: '',
            valuedatapenerima: []
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

        this.setNoRekeningTujuan()
    }

    handleChange = (e) => {
        this.setState({ noRekening: e.target.value })
    }

    handleChangeNoRekening = (e) => {
        this.setState({ noRekening: e.target.value.replace(/\D/, '') })
    }

    handleChangeJumlah = (e) => {
        this.setState({ jumlahTransfer: e.target.value.replace(/\D/, '') })
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
        let a = this.state.noRekeningPenerima_option;
        const filterObj = a.filter((item) => item.value !== this.state.noRekening);
        this.setState({
            noRekeningPenerima_option: filterObj
        })
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
        this.setState({ openModal: true, namaPengirim: nama, saldoPengirim: saldo })
    }

    transfer = () => {
        const data_penerima = this.state.valuedatapenerima.filter((item) => item.noRekening === this.state.rekeningpenerima)
        console.log(this.state.valuedatapenerima.filter((item) => item.noRekening === this.state.rekeningpenerima))
        console.log(this.state.dataRekening[0], "<<<<< DATA REKENING")
        console.log(this.state.valuedatapenerima, "<<<<< ZXZXZXZXZXZXZ")
        console.log(this.state.jumlahTransfer, "<<<<< JUMLAH")

        var saldo_pengirim = parseInt(this.state.dataRekening[0].saldo)
        var jumlah_transfer = parseInt(this.state.jumlahTransfer)
        var saldo_penerima = parseInt(data_penerima[0].saldo)
        var transfer = saldo_pengirim - jumlah_transfer
        var transfer_diterima = jumlah_transfer + saldo_penerima

        const pengirim = {
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
                saldo: transfer,
            })
        };

        const penerima = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                userID: parseInt(data_penerima[0].userID),
                nama: data_penerima[0].nama,
                alamat: data_penerima[0].alamat,
                noTelepon: parseInt(data_penerima[0].noTelepon),
                noRekening: parseInt(data_penerima[0].noRekening),
                saldo: transfer_diterima,
            })
        };

        const reqInsertDebit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                noTelepon: parseInt(this.state.dataRekening[0].noTelepon),
                noRekeningDituju: parseInt(this.state.dataRekening[0].noRekening),
                statusKet: 1,
                uangNasabah: parseInt(this.state.jumlahTransfer),
                statusNasabah: 'D',
                noRekening: parseInt(this.state.dataRekening[0].noRekening)
            })
        };

        const reqInsertKredit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                noTelepon: parseInt(data_penerima[0].noTelepon),
                noRekeningDituju: parseInt(data_penerima[0].noRekening),
                statusKet: 2,
                uangNasabah: parseInt(this.state.jumlahTransfer),
                statusNasabah: 'K',
                noRekening: parseInt(this.state.dataRekening[0].noRekening)
            })
        };

        if (jumlah_transfer > saldo_pengirim) {
            Swal.fire({
                title: 'Info!',
                text: 'Maaf, Saldo Tidak Cukup',
                icon: 'info',
                confirmButtonText: 'OK'
            })
        } else {
            fetch("http://localhost:7070/api/transaksi-nasabah/insert", reqInsertDebit)
                .then((response) => response.json())
                .then((res) => {
                    fetch("http://localhost:7070/api/transaksi-nasabah/insert", reqInsertKredit)
                        .then((response) => response.json())
                        .then((res) => {
                            fetch("http://localhost:7070/api/master-bank/update", pengirim)
                                .then((response) => response.json())
                                .then((responseJsonS) => {
                                    fetch("http://localhost:7070/api/master-bank/update", penerima)
                                        .then((response) => response.json())
                                        .then((responseJson) => {
                                            if (responseJson && responseJson.status === 200) {
                                                Swal.fire({
                                                    title: 'Success!',
                                                    text: 'Berhasil Transfer',
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
                                                    jumlahTransfer: '',
                                                })
                                                this.setState({ blocking: false, openModal: false })
                                            } else {
                                                Swal.fire({
                                                    title: '',
                                                    text: 'Gagal Transfer',
                                                    icon: 'warning',
                                                    confirmButtonText: 'OK'
                                                })
                                            }
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    handleNoRekeningTujuan = (e) => {
        console.log(e.target.value, "<<<< EVENT")
        this.setState({
            rekeningpenerima: e.target.value
        })

        fetch(
            "http://localhost:7070/api/master-bank/getMasterBank?noRekening=" + e.target.value)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json.data.data, "<<<<<< USERS")

                json.data.data.forEach((item) => {
                    this.setState({
                        userIDPenerima: item.userID,
                        namaPenerima: item.nama,
                        alamatPenerima: item.alamat,
                        noTeleponPenerima: item.noTelepon,
                        noRekeningPenerima: item.noRekening,
                        saldoPenerima: item.saldo
                    })
                })
            }).catch((error) => {
                this.setState({ blocking: false });
            });
    }

    setNoRekeningTujuan = () => {
        this.setState({ blocking: true });
        this.setState({ noRekeningPenerima_option: [] })
        let newData = [];
        fetch(
            "http://localhost:7070/api/master-bank/getMasterBank")
            .then((res) => res.json())
            .then((json) => {
                console.log(json.data.data, "<<<<<< MMMMMMMMMMMMMMMMMMMMMMM")

                json.data.data.forEach(el => {
                    console.log(el, "<<<<< EL ZZZZZ")
                    this.setState({
                        userIDPenerima: el.userID,
                        namaPenerima: el.nama,
                        alamatPenerima: el.alamat,
                        noTeleponPenerima: el.noTelepon,
                        noRekeningPenerima: el.noRekening,
                        saldoPenerima: el.saldo,
                    })
                    const obj = { "value": el.noRekening, "label": el.nama, "norek": el.saldo }
                    newData.push(obj);
                });
                console.log(json.data.data, "<<<<<< NEW DATA")
                this.setState({
                    noRekeningPenerima_option: newData,
                    valuedatapenerima: json.data.data
                });
            }).catch((error) => {
                this.setState({ blocking: false });
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
                            <strong>Transfer</strong>

                        </CCardHeader>
                        {/* <CAccordion> */}
                        <div className='form-input'>
                            <CRow className="form-group row mt-2">
                                <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                <CCol xs="10" md="8" className="mt-2">
                                    <CFormInput size='md' type="text" id="noRekening" placeholder="Masukkan no rekening" onChange={this.handleChangeNoRekening} value={this.state.noRekening} />
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
                    <CModal size="lg" alignment="center" visible={this.state.openModal} onClose={this.handleCloseModal}>
                        <CModalHeader>
                            <CModalTitle>Detail Rekening</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <CRow className="form-group row">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input" style={{ fontWeight: 'bold' }}>Pengirim : </CFormLabel>
                                </CRow>
                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        {this.state.namaPengirim}
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        {this.state.noRekening}
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input" style={{ fontWeight: 'bold' }}>Penerima : </CFormLabel>
                                </CRow>
                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama & No. Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormSelect size='md' id="noRekeningPenerima" name="noRekeningPenerima" onChange={this.handleNoRekeningTujuan}>
                                            <option value=''>Silakan Pilih</option>
                                            {this.state.noRekeningPenerima_option.map((el) => {
                                                return (
                                                    <option value={el.value}>{el.label} ~ <span style={{ fontWeight: 'bold' }}> No. Rekening : {el.value} </span></option>
                                                )
                                            })}
                                        </CFormSelect>
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-2">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nominal Transfer</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="jumlahTransfer" placeholder="Masukkan nominal setoran" onChange={this.handleChangeJumlah} value={this.state.jumlahTransfer} />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    {/* <CCol xs = "20" md="8" className="mt-2"> */}
                                    <CButton color="info" style={{ display: 'flex', justifyContent: 'center', width: '20%', margin: 'auto' }} onClick={this.transfer} >Transfer</CButton>
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

export default transfer