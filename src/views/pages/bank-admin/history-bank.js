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

// const historyBank = () => {

class historyBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            items: [],
            currentPage: 1,
            sizePerPage: 5,
        }
    }

    componentDidMount() {
        this.getHistoryBank()
    }


    getHistoryBank = () => {
        fetch(
            "http://localhost:7070/api/history-nasabah/getHstnb")
            .then((res) => res.json())
            .then((json) => {
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
                name: 'Nominal',
                selector: row => this.formatRupiah(row.uangNasabah),
            },
            {
                name: 'No Rekening Dituju',
                selector: row => row.noRekeningDituju
            },
            // {
            //     key: 'noTelepon',
            //     label: 'No Telepon',
            // },
            
            
            {
                name: 'Status Ket.',
                selector: row => {
                    if(row.statusKet === '1'){
                        return 'Setor'
                    } else if (row.statusKet === '2'){
                        return 'Ambil'
                    } else if (row.statusKet === '3'){
                        return 'Transfer'
                    } else if (row.statusKet === '4'){
                        return 'Bayar Telepon'
                    } else {
                        return ''
                    }
                }
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
                            <strong>History Bank</strong>
                        </CCardHeader>
                        <CCardBody>
                            <DataTable
                            pagination
                                columns={columns}
                                data={this.state.items}
                                responsive
                                highlightOnHover
                                striped
                                customStyles={customStyles}>
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

export default historyBank