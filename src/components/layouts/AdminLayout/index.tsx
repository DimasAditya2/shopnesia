import Sidebar from "@/components/fragments/Sidebar"
import styles from './AdminLayout.module.scss'
import { PropsAdmin } from "@/types"
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

const listSidebarItem = [
    {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: <MdOutlineSpaceDashboard size={24} />
    },
    {
        title: 'Products',
        url: '/admin/products',
        icon: <MdOutlineProductionQuantityLimits size={24} />
    }
]

const AdminLayout = (props: PropsAdmin) => {
    const { children } = props
    return (
        <div className={styles.admin}>
            <Sidebar lists={listSidebarItem}/>
            {children}
        </div>
    )
}

export default AdminLayout