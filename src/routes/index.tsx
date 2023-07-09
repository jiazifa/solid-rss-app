import { Title } from "solid-start";

import Navbar from "~/components/Navbar";
import { NAVBAR_LINKS } from "~/utils/router";


export default function Home() {



  return (
    <main>
      <Title>首页</Title>
      <Navbar links={NAVBAR_LINKS} active="/" />

    </main>
  );
}
