import Image from 'next/image';

const Logo = () => {
  return (
    <Image
      src='/initials.png'
      alt='Logo'
      width={200}
      height={200}
    />
  );
};

export default Logo;
