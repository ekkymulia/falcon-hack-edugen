import Menu from "./Menu";

import AnekaNasiIcon from "../../public/assets/images/food/aneka-nasi.jpg";
import AyamIcon from "../../public/assets/images/food/ayam.jpg";
import CepatSajiIcon from "../../public/assets/images/food/cepat-saji.jpg";
import MinumanIcon from "../../public/assets/images/food/minuman.jpg";

const menus = [
  {
    id: 1,
    title: "Sinar Bulan",
    rating: "4.8 (26)",
    category: "Aneka Nasi",
    price: "Gratis · Mulai dari 30 menit",
    discount: "25% off",
    image: AnekaNasiIcon,
  },
  {
    id: 2,
    title: "Ayam Gacoan - Fatmawati",
    rating: "4.7 (2rb+)",
    category: "Bakmi",
    price: "Mulai dari 25 menit",
    discount: "15% off",
    image: AyamIcon,
  },
  {
    id: 3,
    title: "Burger Bageur",
    rating: "4.7 (1rb+)",
    category: "Cepat Saji",
    price: "Gratis · Mulai dari 15 menit",
    discount: "20% off",
    image: CepatSajiIcon,
  },
  {
    id: 4,
    title: "Milkshake Europano",
    rating: "4.8 (1rb+)",
    category: "Minuman",
    price: "Gratis · Mulai dari 10 menit",
    discount: "30% off",
    image: MinumanIcon,
  },
];

const MenusList = () => {
  return (
    <section>
      {menus.map((menu, index) => (
        <Menu key={index} menu={menu} />
      ))}
    </section>
  );
};

export default MenusList;
