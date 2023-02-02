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
    CSmartTable
} from '@coreui/react'
import { DocsExample } from 'src/components'
import DataTable from 'react-data-table-component';

// const masterBank = () => {

class masterBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: []
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

    edit = () => {

    }

    delete = () => {

    }

    render() {
        const columns = [
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
                            <CButton type="button" class="btn btn-default btn-sm" onclick={this.edit()}>,
                                <i class="far fa-pencil-alt"></i>
                            </CButton>
                            <CButton type="button" class="btn btn-default btn-sm" onclick={this.delete()}>,
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
                            <strong>Master Bank</strong>
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
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        );
    }
}

export default masterBank