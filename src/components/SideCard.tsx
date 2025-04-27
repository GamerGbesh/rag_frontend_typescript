import styles from "../css/sidecard.module.css"
import {SideCardProps} from "../interfaces/Props.ts";

export default function SideCard({item, index, activeFunction, active, setActive}: SideCardProps) {
    return (
        <p className={`${index===active ? styles.active : ""} 
        px-4 py-3 bg-white/10 rounded-md cursor-pointer transition-all hover:bg-white/20 
        hover:translate-x-1  active:font-semibold`}
           key={index} onClick={() => {
            activeFunction(item);
            if (setActive && index) {
                setActive(index)
            }
        }}
        >
            {
                "library_name" in item && item.library_name ||
                "course_name" in item && item.course_name ||
                "user" in item && item.user.username
            }
        </p>
    )
}