import Image from "next/image";

import Food0 from "../../public/assets/images/food/food0.jpg";
import Food1 from "../../public/assets/images/food/food1.jpg";
import Food2 from "../../public/assets/images/food/food2.jpg";

const MainContent = () => {
  return (
    <div className="bg-white p-4">
      <h3 className="mt-8 text-xl font-bold text-gray-600">Hello, Ekky</h3>
      <div className="mt-2 py-10 grid grid-cols-4 gap-6">
        <div className="col-span-2 bg-white rounded shadow p-2">
          <div className="h-48 bg-blue-300"></div>
          <p className="mt-2 text-gray-600">Hello, Ekky</p>
        </div>
        <div className="bg-white rounded shadow p-2">
          <Image
            src={Food2}
            alt="Soto ayam"
            className="w-full h-24 object-cover rounded"
            width={400}
            height={200}
          />
          <p className="mt-2 text-gray-600">Soto Ayam</p>
        </div>
        <div className="bg-white rounded shadow p-2">
          <Image
            src={Food2}
            alt="Soto ayam"
            className="w-full h-24 object-cover rounded"
            width={400}
            height={200}
          />
          <p className="mt-2 text-gray-600">Soto Ayam</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Rekomendasi restoran untukmu</h2>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-2">
            <Image
              src={Food1}
              alt="Ayam goreng"
              className="w-full h-24 object-cover rounded"
              width={400}
              height={200}
            />
            <p className="mt-2 text-gray-600">Ayam Goreng</p>
          </div>
          <div className="bg-white rounded shadow p-2">
            <Image
              src={Food2}
              alt="Soto ayam"
              className="w-full h-24 object-cover rounded"
              width={400}
              height={200}
            />
            <p className="mt-2 text-gray-600">Soto Ayam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
