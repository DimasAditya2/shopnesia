import { PropsListSidebar } from "@/types";
import styles from "./Sidebar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut, useSession } from "next-auth/react";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = (props: PropsListSidebar) => {
  const { lists } = props;
  const { pathname } = useRouter();
  const { status } = useSession()
  console.log(pathname);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__wrapper}>
        <h1 className={styles.sidebar__wrapper__title}>Admin Panel</h1>
        <div className={styles.sidebar__list}>
          {lists.map((list, index) => (

            <Link
              href={list.url}
              key={index}
              className={`${styles.sidebar__wrapper__list__item} ${
                pathname === list.url &&
                styles.sidebar__wrapper__list__item__active
              }`}
            >
              <div
                className={styles.sidebar__wrapper__list__item__link}
              >
                  <span className={styles.sidebar__wrapper__list__item__icon}>
                    {list.icon}
                  </span>
                  <h2 className={styles.sidebar__wrapper__list__item__title}>
                    {" "}
                    {list.title}
                  </h2>
              </div>
                {pathname == list.url && (
                  <div
                    className={styles.sidebar__wrapper__list__item__status}
                  ></div>
                )}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button type="button" variant="danger" onClick={() => signOut()}>Logout <IoIosLogOut size={30}/></Button>
      </div>
    </div>
  );
};

export default Sidebar;
