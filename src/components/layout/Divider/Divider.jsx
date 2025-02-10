import React from 'react';

const Divider = (
  {text ,cls}
) => {
  return (
    // <div className="ml-[170px] mt-[14px]">
    //   <h6 className="text-xs text-zinc-600">or sign up with E-mail</h6>
    // </div>
  //   <div className="flex items-center my-6">
  //   <hr className="flex-grow border-t border-gray-300" />
  //   <span className={`mx-4 text-gray-500 ${cls}`}>{text}</span>
  //   <hr className="flex-grow border-t border-gray-300" />
  // </div>

    <div className={cls}>
      { text }
    </div> 
  );
};

export default Divider;
