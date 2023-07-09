import { Title } from "solid-start";
import Navbar from "~/components/Navbar";
import { NAVBAR_LINKS } from "~/utils/router";

export default function LoginPage() {



    return (
        <main>
            <Title>Login</Title>
            <Navbar links={NAVBAR_LINKS} active="/" />

        </main>
    );
}
