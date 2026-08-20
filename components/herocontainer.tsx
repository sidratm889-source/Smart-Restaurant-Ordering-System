
import styles from '../app/styles/redblack.module.css';

export default function HeroContainer(){
    return(
        <div className={styles.container}>
            <div className="text-white text-center h-200px">
                <h1    className="text-6xl font-bold  text-center">Bistro Bliss</h1>
                <p style={{ fontFamily: 'Poppins, serif' }} className="mt-4 text-1xl text-center text-gray-100">A refined wood-fired dining experience where every dish is crafted with depth, warmth, and elegance.</p>
            <p  style={{ fontFamily: 'Poppins, serif' }}  className = "mt-4 text-sm text-center">⭐4.8 (340+) ⏱ 20–30min 🚚 Free delivery</p>
            </div>
        </div>
    )
}