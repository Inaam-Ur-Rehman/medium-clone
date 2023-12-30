import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
const page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, {user?.email}</p>
      <p>Hello, {user?.given_name}</p>
      <p>Hello, {user?.family_name}</p>
      <img src={user?.picture} alt="" />
      <LogoutLink>Signout</LogoutLink>
    </div>
  );
};

export default page;
