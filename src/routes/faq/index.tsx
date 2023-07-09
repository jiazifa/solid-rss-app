import { Title } from "solid-start";
import Navbar from "~/components/Navbar";

export default function FaqPage() {

    const links = [
        {
            title: "主页",
            href: "/",
        },
        {
            title: "关于",
            href: "/faq",
        }
    ]

    return (
        <main>
            <Title>Hello World</Title>
            <Navbar links={links} active="/" />
            <p>
                Faq
            </p>
        </main>
    );
}
