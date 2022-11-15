import Head from "next/head";
import React from "react";

export default function Login() {
	const [formData, setFormData] = React.useState({ email: "", password: "" });
	const [formError, setFormError] = React.useState(null);

	return (
		<section className="login">
			<Head>
				<title>Piybeep Manager - Авторизация</title>
				<meta
					name="description"
					content="Страница авторизации для Piybeep Manager Panel"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					fetch("/api/sign", {
						method: "POST",
						headers: {
							"Accept": "application/json",
							"Content-Type": "application/json",
						},

						body: JSON.stringify(formData),
					})
						.then(async (res) => {
							const data = await res.json();
							if (!res.ok) {
								setFormError(data.error);
								return;
							}
							alert(data.msg);
						})
						.catch((err) => {
							console.error(err);
						});
				}}
			>
				<h1>Авторизация</h1>
				<div className="login__inputs">
					<div className="login__inputs-item">
						<input
							type="email"
							name="email"
							id="input__email"
							value={formData.email}
							required
							onChange={(e) => {
								setFormData({ ...formData, email: e.target.value });
								setFormError(null);
							}}
						/>
						<p
							className={[
								"login__placeholder",
								formData.email.length ? "login__placeholder_active" : "",
							].join(" ")}
						>
							Почта
						</p>
					</div>
					<div className="login__inputs-item">
						<input
							type="password"
							name="password"
							id="input__password"
							value={formData.password}
							minLength={5}
							required
							onChange={(e) => {
								setFormData({ ...formData, password: e.target.value });
								setFormError(null);
							}}
						/>
						<p
							className={[
								"login__placeholder",
								formData.password.length ? "login__placeholder_active" : "",
							].join(" ")}
						>
							Пароль
						</p>
					</div>
				</div>
				<p className="login__error">{formError || ""}</p>
				<input type="submit" value="Войти" />
			</form>
		</section>
	);
}
