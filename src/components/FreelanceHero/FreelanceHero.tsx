import Image from "next/image";

export default function FreelanceHero() {
  return (
    <div className="flex flex-col max-w-[443px] w-full gap-6 h-full">
      {/* Первый блок */}
      <div 
        className="flex-1 flex items-center rounded-[40px] p-[42px] text-center"
        style={{ 
          backgroundImage: 'url(/layout/1.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="w-full">
          <h1 className="text-[32px] font-semibold text-gray-900 leading-[41px]">
            Фриланс-биржа нового поколения
          </h1>
          <p className="text-gray-700 mt-2 text-sm">
            Найди лучших заказчиков и исполнителей в IT. <br />
            Мы не просто еще одна биржа – мы изменим <br />
            правила игры!
          </p>
        </div>
      </div>

      {/* Второй блок */}
      <div 
        className="flex-1 rounded-[40px] pt-[44px] pl-[44px] pr-[40px] relative"
        style={{ 
          backgroundImage: 'url(/layout/2.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className="text-[20px] font-semibold text-gray-900 leading-6">
          Открыт сбор заявок на перенос информации с аккаунтов с других бирж Фриланса
        </h2>
        <p className="text-black mt-3 text-[15px] leading-5">
            Будет перенесено: рейтинг / отзывы / кол-во заказов / названия заказов
        </p>
        
        {/* Иконки */}
        <div className="mt-6 flex gap-1.5">
          <Image src="/header/fl.png" alt="fl" width={40} height={40} />
          <Image src="/header/kwork.png" alt="kwork" width={40} height={40} />
          <Image src="/header/habar.png" alt="habar" width={40} height={40} />
          <Image src="/header/youdo.png" alt="youdo" width={40} height={40} />
        </div>

        {/* Навигационные кнопки */}
        <div className="absolute bottom-4 right-8 flex space-x-2">
          <button>
            <Image src="/header/prev.png" alt="Previous" width={40} height={40} />
          </button>
          <button>
            <Image src="/header/next.png" alt="Next" width={40} height={40} />
          </button>
        </div>
      </div>
    </div>
  );
}