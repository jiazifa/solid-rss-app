import { createSignal } from "solid-js";
import { Title, useParams } from "solid-start";

import Navbar from "~/components/Navbar";
import RssCell, { Rss } from "~/components/RssItemCell";
import { useRssStore } from "~/store/rss";
import { NAVBAR_LINKS } from "~/utils/router";


export default function RssDetailPage() {

    const params = useParams();
    const rssId = params.uid;

    return (
        <main>
            <Title>首页</Title>
            <Navbar links={NAVBAR_LINKS} active="/" />
            <div class="container">
                {rssId}
            </div>
        </main>
    );
}
