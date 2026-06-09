
import styles from '../app/styles/redblack.module.css';

export default function HeroContainer(){
    return(
        <div className={styles.container}>
            <div className="text-white text-center">
                <h1 className="text-3xl font-bold  mr-270">Bistro Bliss</h1>
                <p className="mt-2 text-sm mr-220 text-gray-100">A refined wood-fired dining experience where every dish is crafted with depth, warmth, and elegance.</p>
            <p className = "mt-4 text-sm mr-220 ">⭐4.8 (340+) ⏱ 20–30min 🚚 Free delivery</p>
            </div>
        </div>
    )
}