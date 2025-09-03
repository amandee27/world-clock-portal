import React from "react";

function Popup(props: any) {
  return (
    <div className="flex items-center justify-center fixed left-0 bottom-0 w-full h-full bg-gray-800 z-70">
      <div className="bg-white rounded-lg w-1/2">
        <div className="flex flex-col items-start p-4">
          <div className="flex items-center w-full">
            <div className="text-gray-900 mb-2 font-semibold text-m">
              Clock {props.deleteTimezone}
            </div>
            <svg
              className="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              onClick={() => {
                props.setPopup(false);
              }}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
          <hr />
          <div className="">Are you sure want to delete the clock ?</div>
          <hr />
          <div className="ml-auto">
            <button
              className="bg-black hover:bg-gray-500 text-white  py-2 px-4 mx-2"
              onClick={() => {
                props.confirmDeleteClock();
                props.setPopup(false);
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                props.setPopup(false);
              }}
              className="bg-transparent hover:bg-gray-500 text-black hover:text-white py-2 px-4 border border-black hover:border-transparent "
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
