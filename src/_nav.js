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
    name: 'Bank Admin',
  },
  {
    component: CNavItem,
    name: 'Master Bank',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'History Bank',
    to: '/theme/typography',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Telepon Admin',
  },
  {
    component: CNavItem,
    name: 'Master Telkom',
    to: '/theme/typography',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laporan Penunggakan',
    to: '/theme/typography',
    icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Laporan Pelunasan',
    to: '/theme/typography',
    icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
  },
  {

    component: CNavTitle,
    name: 'Nasabah',
  },
  {
    component: CNavItem,
    name: 'Cek Saldo',
    to: '/theme/typography',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Setor Tunai',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tarik Tunai',
    to: '/theme/typography',
    icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Transfer',
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
