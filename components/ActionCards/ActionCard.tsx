"use client";

type Props = {
  children: React.ReactNode;
  isSelected: boolean;
  onClick?: () => void;
};

function ActionCard({ children, isSelected, onClick }: Props) {
  return (
    <div
      onClick={onClick && onClick}
      className={`${
        isSelected && "selected border border-primary"
      } bg-base-300 p-4 flex flex-col justify-center items-center w-44 h-44 rounded-lg shadow-lg hover:bg-base-200 cursor-pointer transition-colors duration-150`}
    >
      {children}
    </div>
  );
}

export default ActionCard;
