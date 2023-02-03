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
    CFormSelect,
    CButtonGroup
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilPlus, cilSave, cilTrash, cilX } from '@coreui/icons';
import Swal from 'sweetalert2'

class masterBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            noRekening: '',
            saldo: '',
            userID_option: [],
            statusEdit: false,

            // data table users
            userId: '',
            nama: '',
            alamat: '',
            noTelepon: '',

            blocking: false,
            openModalTambah: false,
            openModalEdit: false,
            currentPage: 1,
            sizePerPage: 5,
        }
    }

    componentDidMount() {
        this.getmasterBank()
        this.setUserID()
    }

    getmasterBank = () => {
        this.setState({ blocking: true });
        fetch(
            "http://localhost:7070/api/master-bank/getMasterBank")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json.data.data,
                    DataisLoaded: true
                }, () => console.log(json));
            }).catch((error) => {
                this.setState({ blocking: false });
            });
    }

    formatRupiah = (number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR"
        }).format(number);
    }

    setUserID = () => {
        this.setState({ blocking: true });
        this.setState({ userID_option: [] })
        let newData = [];
        fetch(
            "http://localhost:7070/api/user/getAllUser")
            .then((res) => res.json())
            .then((json) => {
                // console.log(json.data.data, "<<<<<< USERS")

                json.data.data.forEach(el => {
                    console.log(el, "<<<<< EL")
                    const obj = { "value": el.userId, "label": el.userId }
                    newData.push(obj);
                });
                console.log(newData, "<<<<<< NEW DATA USERS")
                this.setState({
                    userID_option: newData
                });
            }).catch((error) => {
                this.setState({ blocking: false });
            });
    }

    handleChangeUserID = (e) => {
        console.log(e.target.value, "<<<< EVENT USER ID")

        fetch(
            "http://localhost:7070/api/user/getAllUser?userId=" + e.target.value)
            .then((res) => res.json())
            .then((json) => {
                // console.log(json.data.data, "<<<<<< USERS")

                json.data.data.forEach((item) => {
                    this.setState({
                        userID: item.userId,
                        nama: item.nama,
                        alamat: item.alamat,
                        noTelepon: item.noTelepon
                    })
                })
            }).catch((error) => {
                this.setState({ blocking: false });
            });
    }

    handleChangeNama = (e, newArr) => {
        this.setState({ nama: e.target.value.replace(/[^a-zA-Z,. ]/g, '') })
    }

    handleChangeAlamat = (e) => {
        this.setState({ alamat: e.target.value })
    }

    handleChangeNoTelepon = (e) => {
        if (e.target.value.length > 13) {
            return false;
        }
        this.setState({ noTelepon: e.target.value.replace(/\D/, '') })
    }

    handleChangeNoRekening = (e) => {
        // console.log(e.target.value, "<<< NO REKENING")
        this.setState({ noRekening: e.target.value.replace(/\D/, '') })
    }

    handleChangeSaldo = (e) => {
        // console.log(e.target.value, "<<< SALDO")
        this.setState({ saldo: e.target.value.replace(/\D/, '') })
    }

    handleOpenModalTambah = () => {
        this.setState({ openModalTambah: true })
    }

    handleCloseModalTambah = () => {
        this.setState({ openModalTambah: false })
    }

    handleOpenModalEdit = (row) => {
        console.log(row, "<<<<< ROW EDIT")
        this.setState({ openModalEdit: true })
        this.setState({
            userId: row.userID,
            nama: row.nama,
            alamat: row.alamat,
            noTelepon: row.noTelepon,
            noRekening: row.noRekening,
            saldo: row.saldo
        })
    }

    handleCloseModalEdit = () => {
        this.setState({ openModalEdit: false })
    }

    addData = () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                userID: parseInt(this.state.userId),
                nama: this.state.nama,
                alamat: this.state.alamat,
                noTelepon: parseInt(this.state.noTelepon),
                noRekening: parseInt(this.state.noRekening),
                saldo: parseInt(this.state.saldo),
            })
        };

        fetch("http://localhost:7070/api/master-bank/insert", requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.status, "<<<<< STATUS")
                if (responseJson && responseJson.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Berhasil Disimpan',
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
                    })
                    this.setState({ blocking: false, openModalTambah: false })
                } else {
                    Swal.fire({
                        title: '',
                        text: 'Data Gagal Disimpan',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    edit = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer my-token',
                'My-Custom-Header': 'foobar'
            },
            body: JSON.stringify({
                userID: parseInt(this.state.userId),
                nama: this.state.nama,
                alamat: this.state.alamat,
                noTelepon: parseInt(this.state.noTelepon),
                noRekening: parseInt(this.state.noRekening),
                saldo: parseInt(this.state.saldo),
            })
        };

        fetch("http://localhost:7070/api/master-bank/update", requestOptions)
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.status, "<<<<< STATUS")
                if (responseJson && responseJson.status === 200) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Data Berhasil Diperbarui',
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
                    })
                    this.setState({ blocking: false, openModalEdit: false })
                } else {
                    Swal.fire({
                        title: '',
                        text: 'Data Gagal Diperbarui',
                        icon: 'warning',
                        confirmButtonText: 'OK'
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    delete = (row) => {
        console.log(row);
        const deleteParam = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ noRekening: parseInt(row.noRekening) })
        };

        Swal.fire({
            title: 'Apakah anda yakin akan menghapus data ini?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch('http://localhost:7070/api/master-bank/delete', deleteParam)
                    .then((res) => {
                        if (res.status === 200) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Delete Data Berhasil',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            }, () => this.setState({ items: items.filter(el => el.noRekening !== this.state.noRekening) }, () => this.getmasterBank()))
                        } else {
                            Swal.fire({
                                title: 'Gagal',
                                text: 'Delete Data Gagal',
                                icon: 'info',
                                confirmButtonText: 'OK'
                            })
                        }

                    },);
            }
        })
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
                name: 'No. Rekening',
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
                name: 'No. Telepon',
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
                selector: row => {
                    return <td>
                        <CButtonGroup>
                            <CButton size='sm' color="success" shape="rounded" style={{ marginRight: '10px' }} onClick={(e) => this.handleOpenModalEdit(row)}><CIcon size='sm' icon={cilPencil} />
                                Edit
                            </CButton>
                            <CButton size='sm' color="danger" shape="rounded" onClick={(e) => this.delete(row)}><CIcon size='sm' icon={cilTrash} />
                                Delete
                            </CButton>
                        </CButtonGroup>
                    </td>
                }
            },
        ];

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
                            <strong> Master Bank </strong>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <CButton color="primary" className="me-md-2" style={{ marginBottom: '20px' }} onClick={this.handleOpenModalTambah}><CIcon icon={cilPlus} /> Tambah </CButton>
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


                // FORM TAMBAH DATA
                <>
                    <CModal alignment="center" style={{ width: '100%', height: '100%' }} visible={this.state.openModalTambah} onClose={this.handleCloseModalTambah}>
                        <CModalHeader>
                            <CModalTitle>Tambah Data</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <CRow className="form-group row mt-4 mb-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">User ID</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' id="userId" name="userId" onChange={this.handleChangeUserID}>
                                            <option value=''>Silakan Pilih</option>
                                            {this.state.userID_option.map((el) => {
                                                return (
                                                    <option value={el.value}>{el.label}</option>
                                                )
                                            })}
                                        </CFormInput>
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="nama" placeholder="Masukkan Nama Lengkap" onChange={this.handleChangeNama} value={this.state.nama} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Alamat</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="alamat" placeholder="Masukkan Alamat" onChange={this.handleChangeAlamat} value={this.state.alamat} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Telepon</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noTelepon" placeholder="Masukkan No. Telepon" onChange={this.handleChangeNoTelepon} value={this.state.noTelepon} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noRekening" placeholder="Masukkan No Rekening" onChange={this.handleChangeNoRekening} value={this.state.noRekening} />
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
                            <CButton color="danger" onClick={this.handleCloseModalTambah}>
                                Batal
                            </CButton>
                            <CButton color="primary" onClick={this.addData}>
                                Simpan
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </>


                // FORM EDIT DATA
                <>
                    <CModal alignment="center" style={{ width: '100%', height: '100%' }} visible={this.state.openModalEdit} onClose={this.handleCloseModalEdit}>
                        <CModalHeader>
                            <CModalTitle>Edit Data</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div>
                                <CRow className="form-group row mt-4 mb-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">User ID</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' id="userId" name="userId" onChange={this.handleChangeUserID} value={this.state.userId} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Nama</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="nama" placeholder="Masukkan Nama Lengkap" onChange={this.handleChangeNama} value={this.state.nama} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">Alamat</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="alamat" placeholder="Masukkan Alamat" onChange={this.handleChangeAlamat} value={this.state.alamat} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Telepon</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noTelepon" placeholder="Masukkan No. Telepon" onChange={this.handleChangeNoTelepon} value={this.state.noTelepon} disabled />
                                    </CCol>
                                </CRow>

                                <CRow className="form-group row mt-4">
                                    <CFormLabel htmlFor="staticEmail" className="col-sm-4 col-form-label row-form-input">No. Rekening</CFormLabel>
                                    <CCol xs="10" md="8" className="mt-2">
                                        <CFormInput size='md' type="text" id="noRekening" placeholder="Masukkan No Rekening" onChange={this.handleChangeNoRekening} value={this.state.noRekening} disabled />
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
                            <CButton color="danger" onClick={this.handleCloseModalEdit}>
                                Batal
                            </CButton>
                            <CButton color="primary" onClick={this.edit}>
                                Simpan
                            </CButton>
                        </CModalFooter>
                    </CModal>
                </>

            </CRow>
        );
    }
}

export default masterBank