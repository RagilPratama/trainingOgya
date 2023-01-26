import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBank,
  cilDollar,
  cilDrop,
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
    name: 'Data Master',
  },
  {
    component: CNavItem,
    name: 'Master Bank',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Master User',
    to: '/theme/typography',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Master Pelanggan',
    to: '/theme/typography',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transaksi Nasabah',
    to: '/theme/typography',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Cek Saldo',
    to: '/theme/typography',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor',
    to: '/theme/typography',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ambil',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer Antar Rekening',
    to: '/theme/typography',
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
