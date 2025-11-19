import React, { Suspense, useEffect, useState } from "react";
import useUserStore from "../store/userStore";
import useConstStore from "../store/constStore";
import useDashboardStore from "../store/dashboardStore";
import axios from "axios";
// import Marquee from "../components/Dashboard/Marquee";
import Intro from "../components/Dashboard/Intro";
import Loader from "../components/common/Loader";
import { FaWallet } from "react-icons/fa";
const Card = React.lazy(() => import("../components/Dashboard/Card"));
const Graph = React.lazy(() => import("../components/Dashboard/Graph"));
const DetailedCards = React.lazy(() =>
  import("../components/Dashboard/DetailedCards")
);
const Link = React.lazy(() => import("../components/Dashboard/Link"));
const Img = React.lazy(() => import("../components/Dashboard/Img"));
const YouTube = React.lazy(() => import("../components/Dashboard/YouTube"));
const Transaction = React.lazy(() =>
  import("../components/Dashboard/Transaction")
);
const Footer = React.lazy(() => import("../components/common/Footer"));

function Dashboard() {
  const { user, isConnected, token } = useUserStore();
  const { baseUrl, setScreenLoading } = useConstStore();
  const { dashboardData, setDashBoardData } = useDashboardStore();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setScreenLoading(true);
    const fetchUserData = async () => {
      if (user && isConnected) {
        try {
          const [dashboardRes, generalRes] = await Promise.all([
            axios.post(
              `${baseUrl}dashboard`,
              { user_id: user?.id },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
            axios.get(`${baseUrl}generalSetting`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

          // Handle dashboard response
          if (dashboardRes.data.status === 200) {
            setDashBoardData(dashboardRes.data.data);
          }

          // Handle general settings response
          if (generalRes.data.status === 200) {
            if (generalRes.data.data.popup_status === 1) {
              setShowModal(true);
              setTitle(generalRes.data.data.popup_title);
              setMsg(generalRes.data.data.popup_message.split("\n"));
            }
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setScreenLoading(false);
        }
      }
    };

    fetchUserData();
  }, [user, isConnected]);

  useEffect(() => {
    if (!dashboardData) {
      return
    }
    const total = (dashboardData?._4x_pending) + (dashboardData?._4x_income)
    const percentage = (dashboardData?._4x_income / total) * 100;

    if (percentage >= 85 && percentage < 100) {
      setShowModal2(true)
    }

    if (percentage == 100) {
      setShowModal3(true)
    }
    // console.log({ total, income: dashboardData?._4x_income, pending: dashboardData?._4x_pending, percentage })
  }, [dashboardData])

  const Data = [
    {
      title: "WITHDRAW BALANCE",
      balance: dashboardData?.user_wallet?.balance.toFixed(4),
      icon: FaWallet,
      show: true,
    },
    {
      title: "DEPOSIT BALANCE",
      balance: dashboardData?.user_wallet?.deposit_balance.toFixed(4),
      icon: FaWallet,
      show: true,
    },
    {
      title: "DIRECT TEAM",
      balance: dashboardData?.total_direct,
      icon: FaWallet,
      show: false,
    },
    {
      title: "LEVEL TEAM",
      balance: dashboardData?.all_team,
      icon: FaWallet,
      show: false,
    },
  ];

  const Data2 = [
    {
      title: "DELEGATOR REWARD",
      amount: dashboardData?.daily_profit.toFixed(4),
      balanceRoi: dashboardData?.user_wallet?.roi_pending.toFixed(4),
      tag: (
        <div>
          Earn delegator rewards{" "}
          <span className="text-[#1FD022] font-semibold">10.8%</span> per month
        </div>
      ),
      showBtn: true,
    },
    {
      title: "DIRECT BONUS",
      amount: dashboardData?.direct_income.toFixed(4),
      tag: (
        <div>
          Earn direct bonus up to{" "}
          <span className="text-[#1FD022] font-semibold">10%</span> from team
        </div>
      ),
    },
    {
      title: "DELEGATOR LEVEL BONUS",
      amount: dashboardData?.level_profit.toFixed(4),
      tag: (
        <div>
          Earn passive delegator level rewards up to{" "}
          <span className="text-[#1FD022] font-semibold">20</span> level
        </div>
      ),
    },
    {
      title: "RANK & REWARD",
      amount: dashboardData?.rank_income.toFixed(4),
      tag: (
        <div>
          Qualify rank & earn up to{" "}
          <span className="text-[#1FD022] font-semibold">$ 20,00,000</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 p-4 flex flex-col gap-3 max-w-screen">
      {showModal && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span>
              <p>We would like to inform you about the following updates that will take effect from November 1, 2025:</p>
              <ol class="list-decimal list-inside">
                <li>Email & Wallet Address Update Policy.
                  <ul class="list-disc list-inside ml-5">
                    <li>Delegators will no longer be able to change their registered email or wallet address directly.</li>
                    <li>Any change requests must be sent to support from the same registered email address for verification.</li>
                  </ul>
                </li>
                <li>Delegator Capping Limit.
                  <ul class="list-disc list-inside ml-5">
                    <li>The new capping amount for delegators is 2.4X.</li>
                  </ul>
                </li>
                <li>Affiliate Capping Limit.
                  <ul class="list-disc list-inside ml-5">
                    <li>The new capping amount for affiliates is 5.4X.</li>
                    <li>After reaching this limit, the user account will become inactive.</li>
                  </ul>
                </li>
                <li>Inactive Accounts.
                  <ul class="list-disc list-inside ml-5">
                    <li>Inactive users will not receive daily income or new income.</li>
                  </ul>
                </li>
              </ol>
              <p >We appreciate your understanding and continued support.
                If you have any questions or need assistance, please contact our support team.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              {/* <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span> */}
              <p className="mt-2">Dear Delegator,</p>
              <p className="mt-2">Congratulations! 🎉</p>
              <p className="mt-2">You have reached 4.5× profit on your delegated amount.</p>
              <p className="mt-2">Please activate your delegation as soon as possible.
                If your account reaches 5.4× without activation, it may be deactivated and you could begin losing your accumulated income.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal2(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {showModal3 && (
        <div className="fixed z-30 bg-black/70 inset-0 pt-2">
          <div className="w-full max-w-md sm:max-w-lg mx-auto bg-gradient-to-br from-[#0D1B2A] to-[#09182C] text-gray-200 shadow-xl rounded-2xl p-5 sm:p-6 border border-gray-700">
            {/* Heading */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-7 bg-emerald-500 rounded-full"></div>
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Notice
              </h2>
            </div>

            {/* Message */}
            <div className="text-gray-300 leading-relaxed mb-5 text-sm sm:text-base">
              {/* <span className="font-semibold text-emerald-400 block mb-2">
                Important Update – Changes Effective from November 1, 2025
              </span> */}
              <p className="mt-2">Dear Delegator,</p>
              <p className="mt-2">Congratulations! 🎉</p>
              <p className="mt-2">You have reached 5.4× profit on your delegated amount.</p>
              <p>Please activate your delegation to continue earning daily rewards.</p>
              <p className="mt-2">Best Regards,</p>
              <p className="text-emerald-500">Team Asia Validator</p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal3(false)}
                className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-medium rounded-lg shadow-md cursor-pointer transition"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <Marquee /> */}
      <Intro />
      <Suspense fallback={<Loader />}>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5">
          {Data.map((item, index) => (
            <Card
              key={index}
              icon={item.icon}
              title={item.title}
              balance={item.balance}
              show={item.show}
            />
          ))}
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Graph />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <div className="grid lg:grid-cols-2 gap-3 sm:gap-5">
          {Data2.map((item, index) => (
            <DetailedCards
              key={index}
              title={item.title}
              amount={item.amount}
              show={item.showBtn}
              balanceRoi={item.balanceRoi}
            >
              {item.tag}
            </DetailedCards>
          ))}
        </div>
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Link />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Img />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <YouTube />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Transaction />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Dashboard;
