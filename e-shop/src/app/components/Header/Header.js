import React, { useEffect } from "react";
/* UI Package */
import { Disclosure, Menu, Transition } from "@headlessui/react";

/* React Router */
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../state/hooks/hooks";
import {
  AddToCart,
  selectItem,
  UpdateCart,
} from "../../state/features/Item/ItemSlice";

const Header = () => {
  const history = useNavigate();
  const cartData = useAppSelector(selectItem).cartData;

  useEffect(() => {}, [cartData]);

  return (
    <div>
      <Disclosure
        as="header"
        className="sticky top-0 left-0 right-0 bg-cgray-50 z-20"
        style={{ boxShadow: "0px 7px 10px 0px rgba(0, 0, 0, 0.05)" }}
      >
        {({ open }) => (
          <>
            <div className="py-5 lg:py-6">
              <div className="container">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <a href="/" className="">
                      <img
                        src={require("../../assets/media/logo.jpg")}
                        alt="website-logo"
                        className="h-9 md:h-16 lg:h-14"
                      />
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div
                      className="flex items-center"
                      onClick={() => history("/cart")}
                    >
                      <i className="fa-solid fa-cart-shopping fa-lg"></i>
                      {cartData?.length > 0 ? (
                        <div className="absolute top-6 right-8 ">
                          <div className="w-5 h-5 rounded-full border-2 border-cgray-50 bg-cyellow-100 flex justify-center bg-red-600 items-center cursor-pointer">
                            <span className="text-xs text-center font-normal font-AvertastdSemiBold text-white">
                              {cartData?.length}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Header;
