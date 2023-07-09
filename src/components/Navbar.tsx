import { JSX, createSignal } from "solid-js";

export interface NavbarLinkItem {
    href: string;
    title: string;
    links?: NavbarLinkItem[];
}

const NavbarItemBuilder = ({ item, active }: { item: NavbarLinkItem, active?: boolean }): JSX.Element => {
    const { href, title, links } = item;
    if (links) {
        return (
            <div class="navbar-item has-dropdown is-hoverable is-active">
                <a class="navbar-link" href={href}>
                    {title}
                </a>
                <div class="navbar-dropdown is-boxed">
                    {links.map((link) => (
                        <a class="navbar-item" href={link.href}>
                            {active === true ? '[' : ''}{link.title}{active === true ? ']' : ''}
                        </a>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <a class="navbar-item has-shadow" href={href}>
            {title}
        </a>
    );
}



const Navbar = ({ links, active }: { links: NavbarLinkItem[], active?: string }) => {
    const [burgerOpen, setBurgerOpen] = createSignal(false);

    return (
        <nav class="navbar is-transparent">
            <div class="navbar-brand">
                <a class="navbar-item" href="#">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                </a>
                <div class={`navbar-burger ${burgerOpen() ? 'is-active' : ''}`}
                    data-target="navbarTransparent"
                    onClick={() => setBurgerOpen(!burgerOpen())}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="navbarTransparent" class={`navbar-menu ${burgerOpen() ? 'is-active' : ''}`}>
                < div class="navbar-start">
                    {links.map((link) => (
                        <NavbarItemBuilder item={link} active={active === link.href} />
                    ))}
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <p class="control">
                                <a class="bd-tw-button button"
                                    data-social-network="Twitter"
                                    data-social-action="tweet"
                                    data-social-target="https://bulma.io"
                                    href="/authentication/login/">
                                    <span>
                                        登录
                                    </span>
                                </a>
                            </p>
                            <p class="control">
                                <a class="button is-primary" href="#">
                                    <span class="icon">
                                        <i class="fas fa-download"></i>
                                    </span>
                                    <span>Download</span>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;