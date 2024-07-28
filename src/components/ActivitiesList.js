import ActivityItem from "./ActivityItem";

import MakananIcon from "/public/assets/images/feature/food.png";

const activities = [
  {
    id: 1,
    icon: MakananIcon,
    name: "Burger Bageur - Jalan Cipete Raya",
    date: "27 Jul 2024, 09:00",
    price: "Rp23.500",
    points: "+71 poin",
  },
  {
    id: 2,
    icon: MakananIcon,
    name: "Pizza Hut - Jalan Cipete Raya",
    date: "23 Jul 2024, 10:31",
    price: "Rp88.500",
    points: "",
  },
  {
    id: 3,
    icon: MakananIcon,
    name: "Pecel Lele Lela - Jalan Jenderal Sudirman",
    date: "21 Jul 2024, 19:48",
    price: "Rp18.000",
    points: "",
  },
  {
    id: 4,
    icon: MakananIcon,
    name: "Warung Sunda Mang Asep",
    date: "19 Jul 2024, 10:54",
    price: "Rp22.500",
    points: "",
  },
  {
    id: 5,
    icon: MakananIcon,
    name: "Mie Caguan Tanjung Duren",
    date: "19 Jul 2024, 10:54",
    price: "Rp29.000",
    points: "",
  },
];

const ActivitiesList = () => {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-lg font-bold mb-4">Aktivitas</h2>
      {activities.map((activity, index) => (
        <ActivityItem key={index} item={activity} />
      ))}
    </div>
  );
};

export default ActivitiesList;
