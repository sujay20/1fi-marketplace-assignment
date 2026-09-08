import bannerImage from '../../assets/shop-banner.webp';

export default function Banner() {
  return (
    <div className="relative overflow-hidden">
      <img
        src={bannerImage}
        alt="Shop today, pay later using mutual funds — no-cost EMIs, no credit score required."
        width={1535}
        height={1024}
        className="block w-full h-auto"
        style={{ aspectRatio: '1535 / 1024' }}
      />
    </div>
  );
}

