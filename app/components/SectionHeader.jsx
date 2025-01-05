import Image from "next/image";
import React from "react";

const SectionHeader = ({title,style}) => {
  return (
    <h2 className={`text-xl uppercase font-semibold text-customBlue mb-4 flex items-center gap-1 ${style}`}>
      <Image src="/logo.webp" alt="logo" width={30} height={20} />
      {title}
    </h2>
  );
};

export default SectionHeader;
