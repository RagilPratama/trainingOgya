import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBank,
  cilDollar,
  cilMoney,
  cilPencil,
  cilPeople,
  cilPhone,
  cilUser,
  cilWallet,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Bank Admin',
  },
  {
    component: CNavItem,
    name: 'Master Bank',
    to: '/master-bank/master-bank',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Bank',
    to: '/master-bank/history-bank',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Telepon Admin',
  },
  {
    component: CNavItem,
    name: 'Master Telkom',
    to: '/telepon-admin/master-telkom',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Nasabah',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo',
    to: '/nasabah/cek-saldo',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/nasabah/setor-tunai',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tarik Tunai',
    to: '/nasabah/tarik-tunai',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
    to: '/nasabah/transfer',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Bayar Telpon',
    to: '/theme/typography',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
  },
]
export default _nav
