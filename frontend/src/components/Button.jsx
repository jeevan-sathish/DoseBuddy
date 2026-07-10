const Button = ({ title }) => {
  return (
    <button className="  w-[100px] h-[40px] bg-gray-950 hover:bg-gray-900 hover:cursor-grab">
      {title}
    </button>
  );
};

export default Button;
