import { AiOutlineEdit } from "solid-icons/ai";

export interface Rss {
    uuid: string;
    title: string;
    link: string;
    description: string;
    content: string;
    source: string;
    insertAt: number;
}

const RssCell = ({ item, onClick }: { item: Rss, onClick: () => void }) => {
    return (
        <>
            <div class="box">
                <article class="media" onClick={onClick}>
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img src="image.jpg" alt="" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>
                                <strong>{item.title}</strong>

                                <br />
                                {item.description}
                            </p>
                        </div>
                        <nav class="level is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <span class="icon is-small">
                                        <AiOutlineEdit />
                                    </span>
                                    <span>{item.insertAt}</span>
                                    <small>{item.source}</small>
                                </div>
                            </div>
                        </nav>
                    </div>
                </article>
            </div>
        </>
    )
}

export default RssCell;