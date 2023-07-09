import { Navigate, Title, useNavigate } from "solid-start";
import Navbar from "~/components/Navbar";
import { NAVBAR_LINKS } from "~/utils/router";

import { BsPersonFill } from 'solid-icons/bs'
import { AiOutlineMail, AiOutlineEdit } from 'solid-icons/ai'
import { createSignal } from "solid-js";

export default function LoginPage() {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [usernameError, setUsernameError] = createSignal('');
    const [passwordError, setPasswordError] = createSignal('');

    const navigate = useNavigate();
    const loginAction = () => {
        navigate('/');
    }

    function buildLogin() {
        return <div class="box is-vcentered">
            <div class="field">
                <label class="label">用户名/邮箱</label>
                <div class="control has-icons-left has-icons-right">
                    <input class={`input ${usernameError() ? 'is-danger' : ''}`}
                        type="text"
                        placeholder="请输入邮箱"
                        value={username()}
                        onChange={e => setUsername(e.currentTarget.value)} />
                    <span class="icon is-small is-left">
                        <AiOutlineMail />
                    </span>
                    <span class="icon is-small is-right">
                        <AiOutlineEdit />
                    </span>
                </div>
                {usernameError() ? <p class="help is-danger">{usernameError()}</p> : null}
            </div>

            <div class="field">
                <label class="label">密码</label>
                <div class="control has-icons-left has-icons-right">
                    <input class={`input ${passwordError() ? 'is-danger' : ''}`}
                        type="password"
                        placeholder="输入密码"
                        value={password()}
                        onChange={e => setPassword(e.currentTarget.value)} />
                    <span class="icon is-small is-left">
                        <BsPersonFill />
                    </span>
                    <span class="icon is-small is-right">
                        <AiOutlineEdit />
                    </span>
                </div>
                {passwordError() ? <p class="help is-danger">{passwordError()}</p> : null}
            </div>

            <div class="field is-grouped is-grouped-right">

                <div class="control">
                    <button
                        class="button is-link"
                        onClick={() => loginAction()}
                    >
                        登录
                    </button>
                </div>
                <div class="control">
                    <a href="/authentication/register"
                        class="button is-link is-light">
                        注册
                    </a>
                </div>
            </div>
        </div>;
    }

    return (
        <main>
            <Title>Login</Title>
            <Navbar links={NAVBAR_LINKS} active="/" />
            <section class="section is-small"></section>
            <div class="columns is-centered">
                {buildLogin()}
            </div>
        </main>
    );
}


