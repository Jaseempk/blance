import React from "react";
import { useForm } from "react-hook-form";

const DeactiveAccount = () => {
  const { register, handleSubmit } = useForm();
  const deactiveAccou = (data) => {
    // console.log(data);
  };
  return (
    <>
      <hr className="border-2 border-blue-700 w-full" />
      <hr className="border-2 border-blue-700 w-full" />
      <div className="flex space-x-6">
        <p className="w-2/6">ACCOUNT DEACTIVATION</p>
        <div>
          <p>What happens when you deactivate your account?</p>
          <ul>
            <li>Your profile and Gigs won`t be shown on Fiverr anymore. </li>
            <li>Active orders will be cancelled.</li>
            <li>You won`t be able to re-activate your Gigs.</li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit(deactiveAccou)}>
        <div className="flex mt-4 space-x-6">
          <p className="w-2/6">I`m leaving because...</p>
          <select {...register("reason")} className="h-2/4 border-[1px] rounded-md shadow-md px-2 border-blue-700 outline-[1px] py-[3px] outline-blue-700 form_label bg-indigo-100">
            <option>Choose a reason</option>
            {/* account */}
            <optgroup label="Account">
              <option value="1">Unsubscribe from fiver email</option>
              <option value="">I want to change my user name</option>
              <option value="">I have another account</option>
              <option value="">Others</option>
            </optgroup>
            {/* selling */}
            <optgroup label="Selling">
              <option value="">Not getting enough orders</option>
              <option value="">Negetive experience with buyer/s</option>
              <option value="">I get too many orders</option>
              <option value="">Fiver is complicated or hard to use</option>
              <option value="">I am unhappy with Fiverr`s policies</option>
              <option value="">Others</option>
            </optgroup>
            {/* buying */}
            <optgroup label="Selling">
              <option value="">I can`t get what I need on Fiverr</option>
              <option value="">Fiver is complicated or hard to use</option>
              <option value="">Negetive experience with seller/s</option>
              <option value="">Fiver is complicated or hard to use</option>
              <option value="">I am unhappy with Fiverr`s policies</option>
              <option value="">Others</option>
            </optgroup>
            <option>Something else</option>
          </select>
        </div>
        <input
          className="rounded bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-[2px]"
          type="submit"
          value="Deactive Account"
        />
      </form>
    </>
  );
};

export default DeactiveAccount;
