/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SliderBannerImage from "../../../../components/gigs/SliderBannerImage";
import useAuth from "../../../../hooks/useAuth";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Rating from "@mui/material/Rating";
import styles from "../../../../styles/gigid.module.css";
import Header from "../../../../components/Shared/Header";
import HeaderTop from "../../../../components/Shared/HeaderTop";
import { notification } from "antd";
import Footer from "../../../../components/Shared/Footer";
import { FiUploadCloud } from "react-icons/fi";

const GigDetails = () => {
  const { user } = useAuth();
  const [gig, setSingleGig] = useState({});
  const [showPricing, setShowPricing] = useState("beginner");
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [sellerEmail, setSellerEmail] = useState([]);
  const [thisUser, setThisUser] = useState({});

  // EMAIL FROM QUERY
  let queryEm = router?.query?.gigid;
  let email = queryEm?.slice(queryEm?.indexOf("+++"), queryEm?.length);
  email = email?.substring(3);
  //Buyer rivew
  useEffect(() => {
    const getAllReview = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/sellerEmail/${email}`,
          { headers: { "Content-Type": "application/json" } }
        );
        setSellerEmail(res?.data?.result);
      } catch (err) {
        console.log(err);
      }
    };
    getAllReview();
  }, [email]);

  //hook from
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${user?.email}`)
      .then(
        (response) => {
          setThisUser(response?.data?.result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [user?.email]);
  // buyerImage
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const body = new Object();
    body.rating = rating;
    body.sellerEmail = gig?.email;
    body.buyerEmail = user?.email;
    body.buyerName = user?.displayName ? user?.displayName : "Buyer Name";
    body.description = data?.description;
    body.profession = data?.profession;
    const formData = new FormData();
    formData.append("file", data?.buyerImage[0]);
    formData.append("upload_preset", "jsjb2bic");
    formData.append("upload_preset", "jsjb2bic");
    axios
      .post("https://api.cloudinary.com/v1_1/gsbsoft/image/upload", formData)
      .then((res) => {
        body.buyerImage = res.data.secure_url;
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`, body, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            if (response.statusText === "OK") {
              console.log(response);
              setSellerEmail([...sellerEmail, response.data]);
              notification.success({
                message: "Success",
                description: "Review Created Successfully!",
                placement: "top",
                duration: 2,
                style: {
                  width: 300,
                  borderBottom: "6px solid #3a3",
                  boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
                },
              });
              // something
              reset();
            }
          });
      });
  };
  const configJson = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  // SINGLE GIG LOAD
  let query = router?.query?.gigid;
  let id = query?.slice(0, query?.indexOf("+++"));
  useEffect(() => {
    const getSingleGig = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/gigs/${id}`,
          configJson
        );
        setSingleGig(res?.data?.result[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getSingleGig();
  }, [id]);

  const handleSubmitButton = () => {
    notification.warning({
      message: "Warning",
      description: "Only Buyer can create review",
      placement: "topLeft",
      duration: 2,
      style: {
        width: 300,
        borderBottom: "6px solid #3a3",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
      },
    });
  };
  return (
    <div className=" bg-white min-h-screen gig_details_styles">
      <HeaderTop />
      <Header />
      {/* {!loading && ( */}
      <div className="container-fluid mx-auto px-3 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-4 md:gap-0">
          <div className="col-span-5">
            {/* Gig Slider */}
            <SliderBannerImage gig={gig} />
            {/* Gig Description */}
            <div
              style={{ boxShadow: "-2px 3px 15px rgba(0,0,0,0.1)" }}
              className="p-8 mt-8 rounded-lg"
            >
              {!(gig?.gig_title === "") && (
                <div className="mt-4">
                  <strong className="text-xl font-bold  border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                    Gig Title
                  </strong>
                  <p className="text-lg font-normal mt-2">{gig?.gig_title}</p>
                </div>
              )}
              {!(gig?.description === "") && (
                <div className="mt-3">
                  <strong className="text-xl font-bold  border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                    Gig Description
                  </strong>
                  <p className="text-md  mt-2 opacity-50">{gig?.description}</p>
                </div>
              )}
            </div>

            <div className="mt-16">
              <strong className="text-2xl font-bold text-[#2a3254]  border-b-2 border-orange-200 pr-5 mt-6 pb-1 online-block mb-2">
                Reviews
              </strong>{" "}
              <br /> <br />
            </div>

            {sellerEmail.map((seller, index) => (
              <div key={index} className="w-[95%] mt-10 mx-10">
                <div className="mt-10">
                  <div
                    style={{ boxShadow: "-2px 3px 15px rgba(0,0,0,0.1)" }}
                    className=" rounded-md overflow-hidden p-6"
                  >
                    <div className="flex">
                      <div>
                        <img
                          className="rounded-full w-[200px]"
                          src={seller.buyerImage}
                          alt=""
                        />
                      </div>
                      <div className="mt-10 ml-5">
                        <span className="bg-orange-400 pt-3">
                          <Rating
                            name="half-rating"
                            defaultValue={seller.rating}
                            readOnly
                          />
                        </span>{" "}
                        <br />
                        <h4 className="text-[#2a3254]">{seller.profession}</h4>
                      </div>
                    </div>

                    <div className="ml-2 mt-4">
                      <h1 className="text-[#2a3254] text-2xl capitalize">
                        {seller?.buyerName}
                      </h1>
                      <p className="text-[#2a3254] capitalize">
                        {seller?.description?.slice(0, 200)}...
                      </p>
                      <h2 className="text-[#2a3254] text-xl">
                        {seller?.buyerEmail}
                      </h2>
                      <h5 className="text-[#2a3254]">{seller?.date}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-3">
            {/* <div className="grid grid-cols-8">
    
              <div className="rounded-full col-span-2 w-20 h-20 overflow-hidden">
              
                <img className="mx-w-full" src={gigUser?.avatar} alt="" />
              </div>
              <div className="col-span-6">
                <strong className="border-b-2 border-orange-200 pb-2 mb-4 font-bold text-2xl  capitalize">
                  {gigUser?.name}
                </strong>
                <p className="pt-3 capitalize">{gigUser?.bio}</p>
              </div>
            </div> */}
            {/*  <div className="grid grid-cols-5 gap-4 items-center justify-between  font-bold text-md mt-1 text-center mb-5">
              <strong className="border-y-2   border-orange-200 py-1 capitalize">
                {gigUser?.gender}
              </strong>
              <strong className="border-y-2 col-span-3 border-orange-200 py-1">
                {gigUser?.email}
              </strong>
              <strong className="border-y-2 border-orange-200 py-1 capitalize">
                <Moment fromNow ago>
                  {gigUser?.date}
                </Moment>
              </strong>
            </div> */}
            {/*  {!(gigUser?.about === "") && (
              <div>
                <strong className="text-xl font-bold  border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                  About
                </strong>
                <p className="text-md capitalize mt-4">{gigUser?.about}</p>
              </div>
            )}
            {!(gigUser?.skills === "") && (
              <div className="mt-5">
                <strong className="text-xl font-bold  border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                  Skills
                </strong>
                <p className="text-md capitalize mt-2">{gigUser?.skills}</p>
              </div>
            )}
            {!(gigUser?.education === "") && (
              <div className="mt-5">
                <strong className="text-xl  font-bold  border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                  Education
                </strong>
                <p className="text-md capitalize mt-2">
                  {gigUser?.education}
                </p>
              </div>
            )} */}
            <div className="md:block">
              {/* Gig Pricing cards */}
              <div className="bg-white rounded-md pb-8 relative">
                {/* Header */}
                <div className="">
                  <div className="grid grid-cols-3 bg-white rounded-t-md border-2 border-[#7b92f7] border-b-0">
                    <div
                      className={`text-center cursor-pointer py-2 text-lg font-bold ${
                        showPricing === "beginner" && "bg-[#8537ed] text-white"
                      }`}
                      onClick={() => setShowPricing("beginner")}
                    >
                      Beginner
                    </div>
                    <div
                      className={`text-center cursor-pointer py-2 text-lg font-bold ${
                        showPricing === "expert" && "bg-[#8537ed] text-white"
                      }`}
                      onClick={() => setShowPricing("expert")}
                    >
                      Expert
                    </div>
                    <div
                      className={`text-center cursor-pointer py-2 text-lg font-bold ${
                        showPricing === "experience" &&
                        "bg-[#8537ed] text-white"
                      }`}
                      onClick={() => setShowPricing("experience")}
                    >
                      Experience
                    </div>
                  </div>
                </div>
                {/* body */}
                <div
                  style={{ boxShadow: "-2px 3px 15px rgba(0,0,0,0.1)" }}
                  className=" pb-8 relative bg-white rounded-b-lg lg:w-[467px] md:w-full"
                >
                  {showPricing === "beginner" && (
                    <div>
                      <div className="h-56 flat_gradient pricing_card flex items-center justify-center flex-col">
                        <h2 className="text-xl font-bold text-center  uppercase">
                          Beginner
                        </h2>
                        <h1 className=" text-3xl font-bold text-center uppercase text-white">
                          ${gig?.first_price}/{gig?.first_day}.Day
                        </h1>
                      </div>
                      <div className="flex items-center justify-center ">
                        <div className="rounded-full w-24 h-24 flex items-center justify-center bg-white shadow-lg text-center relative -top-12">
                          <div>
                            <h1 className="text-[#2a3254] text-2xl font-bold">
                              {gig?.first_day}
                            </h1>
                            <h4 className="text-xl font-bold text-[#2a3254]">
                              Day
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 mx-4 pl-2  border-b border-[#2a3254] py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold text-[#2a3254]">
                            Title:
                          </strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.first_title}
                        </div>
                      </div>
                      <div className="grid grid-cols-6 mx-4 pl-2  border-b border-[#2a3254] py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold text-[#2a3254]">
                            Package:
                          </strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.first_desc}
                        </div>
                      </div>
                    </div>
                  )}
                  {showPricing === "expert" && (
                    <div>
                      <div className="h-56 flat_gradient pricing_card flex items-center justify-center flex-col">
                        <h2 className="text-xl font-bold text-center  uppercase">
                          Expert
                        </h2>
                        <h1 className=" text-3xl font-bold text-center uppercase text-white">
                          ${gig?.second_price}/{gig?.second_day}.Day
                        </h1>
                      </div>
                      <div className="flex items-center justify-center ">
                        <div className="rounded-full w-24 h-24 flex items-center justify-center bg-white shadow-lg text-center relative -top-12">
                          <div>
                            <h1 className="text-[#2a3254] text-2xl font-bold">
                              {gig?.second_day}
                            </h1>
                            <h4 className="text-xl font-bold text-[#2a3254]">
                              Day
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 pl-3 mx-3  border-b border-[#2a3254] py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold ">Title</strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.second_title}
                        </div>
                      </div>
                      <div className="grid grid-cols-6 pl-3 mx-3  border-b border-[#2a3254] py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold ">
                            Package:
                          </strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.second_desc}
                        </div>
                      </div>
                    </div>
                  )}
                  {showPricing === "experience" && (
                    <div>
                      <div className="h-56 flat_gradient pricing_card flex items-center justify-center flex-col">
                        <h2 className="text-xl font-bold text-center  uppercase">
                          Experience
                        </h2>
                        <h1 className="text-3xl font-bold text-center uppercase text-white">
                          ${gig?.third_price}/{gig?.third_day}.Day
                        </h1>
                      </div>
                      <div className="flex items-center justify-center ">
                        <div className="rounded-full w-24 h-24 flex items-center justify-center bg-white shadow-lg text-center relative -top-12">
                          <div>
                            <h1 className=" text-2xl font-bold">
                              {gig?.third_day}
                            </h1>
                            <h4 className="text-xl font-bold ">Day</h4>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 pl-3 mx-3  border-b border-[#2a3254] py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold ">Title</strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.third_title}
                        </div>
                      </div>
                      <div className="grid grid-cols-6 pl-3 mx-3  border-b border-[#2a3254]  py-2 rounded-2xl">
                        <div className="col-span-2">
                          <strong className="text-lg font-bold ">
                            Package:
                          </strong>
                        </div>
                        <div className="col-span-4 self-center">
                          {gig?.third_desc}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* end of pricing */}
                {user?.email && (
                  <Link href={`/gig_search/buy_plan/${gig?._id}`}>
                    <button className="button_gradient absolute -mt-6 flat_gradient">
                      Buy Plan
                    </button>
                  </Link>
                )}
                {!user?.email && (
                  <Link href={`/login/register`}>
                    <button className="button_gradient absolute -mt-6 flat_gradient">
                      Buy Plan
                    </button>
                  </Link>
                )}
              </div>
              {/* end of gig_details */}
              <div className="">
                <Link href={`/gig_search/${gig?.email}`}>
                  <button className="py-4 px-5 rounded-lg text-xl bg-[#0a1929] text-white hover:bg-[#8537ed] border mt-4 w-full duration-300 shadow">
                    Contact Me
                  </button>
                </Link>
              </div>
              {/* Start Review */}

              <div>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  className="text-orange-600"
                />
                <div className={`mt-10 ${styles.review_container}`}>
                  <strong className="text-2xl font-bold text-[#2a3254] border-b-2 border-orange-200 pr-5 mt-6 pb-1 mb-2 online-block">
                    Give a Review
                  </strong>{" "}
                  <br /> <br />
                  <span className="bg-orange-400 pt-3">
                    <Rating
                      onChange={(e) => setRating(e.target.value)}
                      defaultValue={2.5}
                      precision={0.5}
                    />{" "}
                    <br />
                  </span>
                  <br />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="shadow-xl p-3"
                  >
                    <textarea
                      className="py-1 px-2 rounded-2 h-18 rounded-md "
                      {...register("description")}
                      placeholder="Your Comment"
                      required
                    />{" "}
                    <br /> <br />
                    <input
                      className="py-1 px-2 rounded-2 border-2 rounded-md shadow-lg "
                      {...register("profession")}
                      placeholder="Your profession*"
                      type="text"
                      required
                    />{" "}
                    <br /> <br />
                    <input
                      type="file"
                      className="hidden"
                      {...register("buyerImage")}
                      id="buyerImage"
                      placeholder="Your image URL*"
                      accept="image/jpg, image/jpeg, image/png"
                      required
                    />{" "}
                    <label htmlFor="buyerImage" className="inline">
                      <div className="bg-gray-200 text-8xl text-gray-600 min-h-[100px] rounded-lg flex items-center justify-center cursor-pointer">
                        <FiUploadCloud />
                      </div>
                    </label>
                    <br /> <br />
                    {thisUser?.status === "buyer" ? (
                      <input
                        className="text-white bg-purple-500 px-4 py-2 rounded-md font-bold"
                        type="submit"
                      />
                    ) : (
                      <button
                        className="text-white bg-purple-500 px-4 py-2 rounded-md font-bold"
                        onClick={handleSubmitButton}
                      >
                        Submit
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )}
      {loading && <Loader />} */}
      <Footer />
    </div>
  );
};

export default GigDetails;
