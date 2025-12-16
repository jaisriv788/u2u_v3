import useUserStore from "../../store/userStore";

function Intro({ address }) {
  const { user } = useUserStore();
  return (
    <div className="py-3 flex justify-between">
      <div>
        <div className="font-semibold text-[18px]">
          WELCOME <span className="text-[#1DCD1D]">U2U DELEGATOR REWARD</span>{" "}
          PROGRAM
        </div>
        <div className="text-sm">User ID: {user?.username}</div>
        <div className="text-sm">Delegator Wallet Address: {address}</div>
      </div>
      <div className="text-sm self-end hidden sm:flex">Dashboard</div>
    </div>
  );
}

export default Intro;
