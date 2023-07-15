import { createSignal } from "solid-js";
import { Title, useNavigate } from "solid-start";

import Navbar from "~/components/Navbar";
import RssCell, { Rss } from "~/components/RssItemCell";
import { useRssStore } from "~/store/rss";
import { NAVBAR_LINKS } from "~/utils/router";


export default function Home() {
  const rssStore = useRssStore();
  const navigate = useNavigate();
  const [rssItems, setRssItems] = createSignal<Rss[]>([
    {
      uuid: "1",
      title: "标题",
      link: "链接",
      description: "描述",
      content: "内容",
      source: "来源",
      insertAt: 0
    }
  ]);
  return (
    <main>
      <Title>首页</Title>
      <Navbar links={NAVBAR_LINKS} active="/" />
      <div class="container">
        {
          rssItems().map((item) => <RssCell item={item} onClick={() => navigate(`/rss/${item.uuid}`)} />)
        }
      </div>
    </main>
  );
}
