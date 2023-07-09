import { Title } from "solid-start";

import Navbar from "~/components/Navbar";
import RssCell from "~/components/RssItemCell";
import { useRssStore } from "~/store/rss";
import { NAVBAR_LINKS } from "~/utils/router";


export default function Home() {
  const rssStore = useRssStore();
  return (
    <main>
      <Title>首页</Title>
      <Navbar links={NAVBAR_LINKS} active="/" />
      <RssCell />
    </main>
  );
}
