import { Navigate, Title, useNavigate } from "solid-start";
import Navbar from "~/components/Navbar";
import { NAVBAR_LINKS } from "~/utils/router";

import { createSignal } from "solid-js";
import { AiOutlineEdit, AiOutlineMail } from "solid-icons/ai";
import { BsPersonFill } from "solid-icons/bs";

export default function LoginPage() {
    const [username, setUsername] = createSignal('');
    const [password, setPassword] = createSignal('');
    const [confirmPassword, setConfirmPassword] = createSignal('');
    const [usernameError, setUsernameError] = createSignal('');
    const [passwordError, setPasswordError] = createSignal('');

    const navigate = useNavigate();
    const registerAction = () => {
        navigate('/');
    }

    const buildRegisterForm = () => {
        return (
            <section class="columns is-centered">
                <div class="box">
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
                            <input class={`input`}
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
                    </div>

                    <div class="field">
                        <label class="label">确认密码</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class={`input ${passwordError() ? 'is-danger' : ''}`}
                                type="password"
                                placeholder="再次输入密码"
                                value={confirmPassword()}
                                onChange={e => setConfirmPassword(e.currentTarget.value)} />
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
                                onClick={() => registerAction()}
                            >
                                注册
                            </button>
                        </div>
                        <div class="control">
                            <a href="/authentication/login"
                                class="button is-link is-light">
                                登录
                            </a>
                        </div>
                    </div>
                </div>

            </section>
        )
    }

    return (
        <main>
            <Title>Login</Title>
            <Navbar links={NAVBAR_LINKS} active="/" />
            <section class="section is-small"></section>
            {buildRegisterForm()}
        </main>
    );
}


