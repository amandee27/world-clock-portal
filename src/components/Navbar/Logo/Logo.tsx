import LogoIcon from "../../../assets/logo/globe-clock-svgrepo-com.svg?react";

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <LogoIcon className="w-3.5 h-3.5 md:w-5 md:h-5 [&_path]:fill-white" />
      <h1 className="md:text-sm text-xs  font-sans-serif">Timezone Clock</h1>
    </div>
  );
}

export default Logo;
