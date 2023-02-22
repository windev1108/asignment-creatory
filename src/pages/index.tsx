import Layout from "@/components/Layout";
import { NextPage, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { deleteCookie, getCookie } from "cookies-next";
import { FiLogOut } from "react-icons/fi";
import { UserResponse } from "./api/view";
import { getView } from "@/lib/view";
import { useEffect, useState } from "react";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const username = getCookie("username", { req, res });

  if (!username) {
    return {
      redirect: {
        destination: "/signin",
        permanent: true,
      },
      props: {},
    };
  }
  return {
    props: {
      username: username || null,
    },
  };
};

const Home: NextPage<{ username: string }> = ({ username }) => {
  const router = useRouter();
  const [data, setData] = useState<UserResponse | null>();
  const [form, setForm] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 10,
    offset: 2,
  });
  const { limit, offset } = form;

  useEffect(() => {
    getView({ limit, offset }).then((res) => {
      setData(res);
    });
  }, [limit, offset]);

  const handleLogout = () => {
    deleteCookie("username");
    router.reload();
  };

  return (
    <Layout>
      <div className="h-screen w-screen overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="relative  z-20 w-[80rem] h-auto bg-white shadow-md p-10 rounded-xl">
          {username && (
            <h1 className="text-center font-bold text-2xl">{`Hi ${username}`}</h1>
          )}
          <button
            onClick={handleLogout}
            className="absolute flex font-semibold top-2 right-2 items-center space-x-1 outline-none active:scale-105 hover:bg-gray-100 p-1 rounded-lg"
          >
            <FiLogOut />
            <h1>Logout</h1>
          </button>

          <div className="grid grid-cols-3 gap-2 my-2 text-center">
            <span className="px-4 py-2 whitespace-nowrap border">
              Limit :{" "}
              <h1 className="inline text-black font-semibold">{data?.limit}</h1>
            </span>
            <span className="px-4 py-2 whitespace-nowrap border">
              Offset :
              <h1 className="inline text-black font-semibold">
                {data?.offset}
              </h1>
            </span>
            <span className="px-4 py-2 whitespace-nowrap border">
              Total :
              <h1 className="inline text-black font-semibold">{data?.total}</h1>
            </span>
          </div>

          <div className="flex my-4 justify-evenly space-x-2">
            <input
              className="outline-none border py-2 px-4 w-full"
              value={limit}
              onChange={({ target }) =>
                setForm({ ...form, limit: parseInt(target.value) })
              }
              type="number"
              placeholder="Enter your limit"
            />
            <input
              className="outline-none border py-2 px-4 w-full"
              name="offset"
              value={offset}
              onChange={({ target }) =>
                setForm({ ...form, offset: parseInt(target.value) })
              }
              type="number"
              placeholder="Enter your Offset"
            />
          </div>

          <div className="flex flex-col my-4 overflow-y-scroll max-h-[20rem]">
            <table className="overflow-y-scroll h-[10rem] border p-10">
              <thead className="px-10">
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Phone</th>
                </tr>
              </thead>
              <tbody className="border">
                {data?.data.map(({ id, email, name, phone }) => (
                  <tr key={id} className="border">
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
