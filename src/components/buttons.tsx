type ButtonsProps = {
  icon: string;
  setOpenImage: (url: string | null) => void;
  //   className?: string;
};

export function Buttons(props: ButtonsProps) {
  return (
    <div
      className="rounded-full bg-black text-white cursor-pointer w-10 h-10 flex justify-center items-center"
      onClick={() => props.setOpenImage(null)}
    >
      {props.icon}
    </div>
  );
}
